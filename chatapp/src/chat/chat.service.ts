import { Injectable } from '@nestjs/common';
import { Channel } from './chat-channel.interface'

@Injectable()
export class ChatService {
    private channelMap: { [key: string]: Channel } = {};

    // addChannel does not work yet
    addChannel(Name: string, Messages: string[]) {
        this.channelMap['g'] = new Channel('safoh', ['message 4'])
    }
}
