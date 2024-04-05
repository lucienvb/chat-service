export class Channel {
	Name: string;
	Messages: string[];
	Blocked: string[];

	constructor(name: string, messages: string[]) {
		this.Name = name;
		this.Messages = messages;
		this.Blocked = ['sbos'];
	}
}