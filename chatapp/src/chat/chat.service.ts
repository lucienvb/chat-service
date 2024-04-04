import { Injectable } from '@nestjs/common';
import { Channel } from './chat-channel.interface'

@Injectable()
export class ChatService {
    public  channelMap: { [key: string]: Channel } = {};

    addChannel(Name: string, Messages: string[]): boolean {
        if (this.channelMap[Name]) {
            console.log(`${Name} already exists`);
            return false;
        }
        this.channelMap[Name] = new Channel(Name, Messages)
        return true;
    }
    
    printChannel(key: string) {
        console.log(`Name: ${this.channelMap[key].Name}`)
        console.log(`Messages: ${this.channelMap[key].Messages}`)
    }

    getMessages(key: string): string[] {
        return (this.channelMap[key].Messages);
    }

    addMessage(key: string, message: string) {
        this.channelMap[key].Messages.push(message);
    }
}
