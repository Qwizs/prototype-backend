import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AnswerQuestionService } from 'src/answer-question/answer-question.service';
import { QuestionsService } from 'src/questions/questions.service';
import { QuizQuestionService } from 'src/quiz-question/quiz-question.service';

@WebSocketGateway({
  cors: {
    origin: [
      'http://172.27.192.1:3000',
      'http://172.20.10.2:3000',
      'http://localhost:3000',
    ],
    credentials: true,
  },
})
export class DemoGateway {
  @WebSocketServer()
  server: Server;

  private participants: { [quizCode: string]: string[] } = {};
  private scores: { [quizCode: string]: { [user: string]: number } } = {};
  private userResponses: { [room: string]: Set<string> } = {};
  private answers: {
    [room: string]: {
      [user: string]: { answer: string; score: number };
    };
  } = {};

  constructor(
    private readonly questionService: QuestionsService,
    private readonly answsersQuestionService: AnswerQuestionService,
    private readonly quizQuestionsService: QuizQuestionService,
  ) {}

  private quizData = {
    questions: [],
    currentQuestionIndex: 0,
  };
  async handleGetQuizData(quizId: number) {
    const data2 = await Promise.all(
      (await this.quizQuestionsService.findByQuiz(quizId)).map(async (item) => {
        const question = await this.questionService.findOne(item.idQuestion);
        const answers = await this.answsersQuestionService.findCompleteAnswers(
          item.idQuestion,
        );
        const correctAnswer =
          await this.answsersQuestionService.findCorrectAnswer(
            item.idQuestion,
            question.type,
          );
        return {
          infos: question,
          options: answers,
          correctOption: correctAnswer.map((answer) => answer.value),
        };
      }),
    );

    this.quizData.questions = data2;
  }

  @SubscribeMessage('generateQuizCode')
  async handleGenerateQuizCode(
    @ConnectedSocket() socket: Socket,
    @MessageBody() quizId: string,
  ) {
    await this.handleGetQuizData(+quizId);
    console.log(this.quizData.questions);

    const quizCode = Math.random().toString(36).slice(2, 9); // Generate a random code
    socket.emit('quizCodeGenerated', quizCode);
  }

  @SubscribeMessage('joinWaitingRoom')
  handleJoinWaitingRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: { user: string; quizCode: string; isOwner: boolean },
  ) {
    const { user, quizCode, isOwner } = data;
    socket.join(quizCode);

    if (!this.participants[quizCode]) {
      this.participants[quizCode] = [];
    }

    if (!this.participants[quizCode].includes(user) && !isOwner) {
      this.participants[quizCode].push(user);
    }

    // Initialiser les scores
    if (!this.scores[quizCode]) {
      this.scores[quizCode] = {};
    }
    if (!this.scores[quizCode][user] && !isOwner) {
      this.scores[quizCode][user] = 0;
    }

    // Envoyer la liste mise à jour au nouvel utilisateur
    socket.emit('currentParticipants', this.participants[quizCode]);

    // Informer les autres joueurs (optionnel, pour affichage live)
    if (!isOwner) {
      socket.to(quizCode).emit('userJoined', user);
    }
  }

  @SubscribeMessage('startQuiz')
  handleStartQuiz(
    @MessageBody() quizCode: string,
    @ConnectedSocket() socket: Socket,
  ) {
    const participants = this.participants[quizCode] || [];

    if (participants.length < 2) {
      socket.emit(
        'exception',
        'Au moins deux joueurs sont requis pour démarrer le quiz.',
      );
      return;
    }

    this.quizData.currentQuestionIndex = 0; // reset
    this.userResponses[quizCode] = new Set();
    this.answers[quizCode] = {};

    this.server.to(quizCode).emit('startQuiz');
    this.sendNextQuestion(quizCode);
  }

  @SubscribeMessage('joinQuizRoom')
  handleJoinQuizRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: { user: string; room: string },
  ) {
    const { user, room } = data;
    console.log(user);
    socket.join(room);

    if (!this.userResponses[room]) this.userResponses[room] = new Set();
    if (!this.answers[room]) this.answers[room] = {};
    if (!this.scores[room]) this.scores[room] = {};
    if (!this.scores[room][user]) this.scores[room][user] = 0;

    if (this.quizData.currentQuestionIndex < this.quizData.questions.length) {
      const question =
        this.quizData.questions[this.quizData.currentQuestionIndex];
      this.server.to(room).emit('newQuestion', question);
    }
  }

  @SubscribeMessage('submitAnswer')
  handleSubmitAnswer(
    @MessageBody()
    data: {
      user: string;
      room: string;
      answer: string;
      score: number;
    },
  ) {
    const { room, user, score } = data;
    this.answers[room][user] = {
      answer: '',
      score,
    };
    this.userResponses[room].add(user);
    this.scores[room][user] += score;

    const expectedUserCount = Object.keys(this.scores[room]).length;

    if (this.userResponses[room].size === expectedUserCount) {
      const currentQuestion =
        this.quizData.questions[this.quizData.currentQuestionIndex];

      this.server.to(room).emit('allUsersResponded');
      this.server.to(room).emit('revealAnswer', {
        correctOption: currentQuestion.correctOption,
      });

      this.userResponses[room].clear();
      this.answers[room] = {};

      this.quizData.currentQuestionIndex++;

      setTimeout(() => {
        this.sendNextQuestion(room);
      }, 2000);
    }
  }

  private sendNextQuestion(room: string) {
    if (this.quizData.currentQuestionIndex < this.quizData.questions.length) {
      const question =
        this.quizData.questions[this.quizData.currentQuestionIndex];
      this.server.to(room).emit('newQuestion', question);
    } else {
      const finalScores = this.scores[room];
      this.server.to(room).emit('quizEnded', finalScores);
    }
  }

  private revealAnswer(room: string) {
    const question =
      this.quizData.questions[this.quizData.currentQuestionIndex];

    this.server.to(room).emit('revealAnswer', {
      correctOption: question.correctOption,
    });

    this.userResponses[room].clear();
    this.answers[room] = {};

    this.quizData.currentQuestionIndex++;

    setTimeout(() => {
      this.sendNextQuestion(room);
    }, 3000);
  }
}
