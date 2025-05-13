import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AnswersService } from 'src/answers/answers.service';
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

  constructor (
    private readonly questionService: QuestionsService,
    private readonly answersService: AnswersService,
    private readonly quizQuestionService: QuizQuestionService,
  ){}
  private participants: { [quizCode: string]: string[] } = {};
  private scores: { [quizCode: string]: { [user: string]: number } } = {};
  private userResponses: { [room: string]: Set<string> } = {};
  private answers: { [room: string]: { [user: string]: string } } = {};

  private quizData = {
    questions: [
      {
        question: 'What is the capital of France?',
        options: ['Paris', 'London', 'Berlin', 'Madrid'],
        correctOption: 'Paris',
      },
      {
        question: 'What is the capital of England?',
        options: ['Paris', 'London', 'Berlin', 'Madrid'],
        correctOption: 'London',
      },
      {
        question: 'What is the capital of Spain?',
        options: ['Paris', 'London', 'Berlin', 'Madrid'],
        correctOption: 'Madrid',
      },
    ],
    currentQuestionIndex: 0,
  };

  @SubscribeMessage('generateQuizCode')
  async handleGenerateQuizCode(@ConnectedSocket() socket: Socket, @MessageBody()data:any) {
      console.log("test");
      const quizId = data.quizId;

      const quizQuestions = await this.quizQuestionService.findOneByQuiz(quizId);
  
      const quizData = await Promise.all(
        questions.map(async (question) => {
          const answers = await this.answersService.findByQuestionId(question.id);
          return {
            ...question,
            answers,
          };
        })
      );
  
    const quizCode = Math.random().toString(36).slice(2, 9); // Generate a random code
    socket.emit('quizCodeGenerated', quizCode);
  }

  @SubscribeMessage('joinWaitingRoom')
  handleJoinWaitingRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: { user: string; quizCode: string },
  ) {
    const { user, quizCode } = data;
    socket.join(quizCode);

    // Initialiser la salle si besoin
    if (!this.participants[quizCode]) {
      this.participants[quizCode] = [];
    }

    // ✅ Empêcher les doublons
    if (!this.participants[quizCode].includes(user)) {
      this.participants[quizCode].push(user);
    }

    // Initialiser les scores
    if (!this.scores[quizCode]) {
      this.scores[quizCode] = {};
    }
    if (!this.scores[quizCode][user]) {
      this.scores[quizCode][user] = 0;
    }

    // Envoyer la liste mise à jour au nouvel utilisateur
    socket.emit('currentParticipants', this.participants[quizCode]);

    // Informer les autres joueurs (optionnel, pour affichage live)
    socket.to(quizCode).emit('userJoined', user);
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
    @MessageBody() data: { user: string; room: string; answer: string },
  ) {
    const { room, user, answer } = data;

    this.answers[room][user] = answer;
    this.userResponses[room].add(user);

    const expectedUserCount =
      this.server.sockets.adapter.rooms.get(room)?.size || 0;

    if (this.userResponses[room].size === expectedUserCount) {
      const currentQuestion =
        this.quizData.questions[this.quizData.currentQuestionIndex];

      Object.entries(this.answers[room]).forEach(([u, ans]) => {
        if (ans === currentQuestion.correctOption) {
          this.scores[room][u] += 1;
        }
      });

      this.server.to(room).emit('allUsersResponded');
      this.server.to(room).emit('revealAnswer', {
        correctOption: currentQuestion.correctOption,
      });

      this.userResponses[room].clear();
      this.answers[room] = {};

      // Incrément ici, une fois qu'on a utilisé la question courante
      this.quizData.currentQuestionIndex++;

      setTimeout(() => {
        this.sendNextQuestion(room);
      }, 3000);
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

    this.quizData.currentQuestionIndex++; // 👈 incrément ici

    setTimeout(() => {
      this.sendNextQuestion(room);
    }, 3000);
  }
}
