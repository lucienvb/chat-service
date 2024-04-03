import { Injectable } from '@nestjs/common';
import { Channel } from './chat-channel.interface'

@Injectable()
export class ChatService {
    public  channelMap: { [key: string]: Channel } = {};

    addChannel(Name: string, Messages: string[]) {
        this.channelMap[Name] = new Channel(Name, Messages)
    }
    
    printChannel(key: string) {
        console.log(`Name: ${this.channelMap[key].Name}`)
        console.log(`Messages: ${this.channelMap[key].Messages}`)
    }
}
