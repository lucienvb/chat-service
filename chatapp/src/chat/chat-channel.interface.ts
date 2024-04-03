export class Channel {
	Name: string;
	Messages: string[];

	constructor(name: string, messages: string[]) {
		this.Name = name;
		this.Messages = messages;
	}
}