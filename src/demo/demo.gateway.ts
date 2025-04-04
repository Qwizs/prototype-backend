import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class DemoGateway {
  @WebSocketServer()
  server: Server;

  private participants: { [quizCode: string]: string[] } = {};
  private scores: { [quizCode: string]: { [user: string]: number } } = {};
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
      // Ajoutez d'autres questions ici
    ],
    currentQuestionIndex: 0,
  };

  private userResponses: { [room: string]: Set<string> } = {};

  @SubscribeMessage('generateQuizCode')
  handleGenerateQuizCode(@ConnectedSocket() socket: Socket) {
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

    // Ajouter l'utilisateur à la liste des participants
    if (!this.participants[quizCode]) {
      this.participants[quizCode] = [];
    }
    this.participants[quizCode].push(user);

    // Initialiser le score de l'utilisateur
    if (!this.scores[quizCode]) {
      this.scores[quizCode] = {};
    }
    this.scores[quizCode][user] = 0;

    // Envoyer la liste complète des participants au nouvel utilisateur
    socket.emit('currentParticipants', this.participants[quizCode]);

    // Informer les autres utilisateurs qu'un nouvel utilisateur a rejoint
    socket.to(quizCode).emit('userJoined', user);
  }

  @SubscribeMessage('startQuiz')
  handleStartQuiz(@MessageBody() quizCode: string) {
    this.quizData.currentQuestionIndex = 0; // Reset the question index
    this.server.to(quizCode).emit('startQuiz');
    // Emit the first question
    this.sendNextQuestion(quizCode);
  }

  @SubscribeMessage('joinQuizRoom')
  handleJoinQuizRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: { user: string; room: string },
  ) {
    const { room } = data;
    socket.join(room);
    if (!this.userResponses[room]) {
      this.userResponses[room] = new Set();
    }

    // Send the first question when a user joins
    this.sendNextQuestion(room);
  }

  @SubscribeMessage('submitAnswer')
  handleSubmitAnswer(
    @MessageBody() data: { user: string; room: string; answer: string },
  ) {
    const { room, user, answer } = data;
    this.userResponses[room].add(user);

    if (
      this.userResponses[room].size ===
      this.server.sockets.adapter.rooms.get(room)?.size
    ) {
      const question =
        this.quizData.questions[this.quizData.currentQuestionIndex - 1];
      if (answer === question.correctOption) {
        this.scores[room][user] += 1;
      }
      this.server.to(room).emit('allUsersResponded');
      this.revealAnswer(room);
    }
  }

  private sendNextQuestion(room: string) {
    if (this.quizData.currentQuestionIndex < this.quizData.questions.length) {
      const question =
        this.quizData.questions[this.quizData.currentQuestionIndex];
      this.server.to(room).emit('newQuestion', question);
      this.quizData.currentQuestionIndex++;
    } else {
      // Send final scores
      const finalScores = this.scores[room];
      this.server.to(room).emit('quizEnded', finalScores);
    }
  }

  private revealAnswer(room: string) {
    const question =
      this.quizData.questions[this.quizData.currentQuestionIndex - 1];
    this.server
      .to(room)
      .emit('revealAnswer', { correctOption: question.correctOption });
    this.userResponses[room].clear();
    this.sendNextQuestion(room);
  }
}
