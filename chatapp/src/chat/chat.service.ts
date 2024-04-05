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

    isBlocked(Name: string, user: string): boolean {
        if (this.channelMap[Name].Blocked.includes(user))
            return true;
        return false;
    }

    block(channel: string, user: string, blocker: string): boolean {

        console.log(`channel: ${channel}`);
        console.log(`user: ${user}`);
        console.log(`blocker: ${blocker}`);
        // if (this.channelMap[channel].Blocked.includes(user))
        //     console.log('joe');
        //     return false;
        // else
        //     this.channelMap[channel].Blocked.push(user);
        console.log("kom ik hier?")
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
