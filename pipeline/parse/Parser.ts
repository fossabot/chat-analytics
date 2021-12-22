import { Platform, FileInput, ID, RawID } from "@pipeline/Types";
import { StepMessage } from "@pipeline/Messages";
import { Database, Author, Channel, Message } from "@pipeline/parse/Database";
import IDMapper from "@pipeline/parse/IDMapper";

export abstract class Parser {
    public database: Database = {
        platform: this.platform,
        title: "Chat",
        authors: [],
        channels: [],
        messages: {},
    };

    protected authorIDMapper = new IDMapper();
    protected channelIDMapper = new IDMapper();
    // each channel has its own list of messages, along with its IDs
    protected messageIDMapper: IDMapper[] = [];

    constructor(private readonly platform: Platform) {}

    abstract parse(file: FileInput): AsyncGenerator<StepMessage>;

    protected addChannel(rawId: RawID, channel: Channel): ID {
        const id = this.channelIDMapper.get(rawId);
        this.database.channels[id] = channel;
        this.messageIDMapper[id] = new IDMapper();
        return id;
    }

    protected addAuthor(rawId: RawID, author: Author): ID {
        const id = this.authorIDMapper.get(rawId);
        this.database.authors[id] = author;
        return id;
    }

    protected addMessage(rawId: RawID, channelId: ID, message: Message): ID {
        const id = this.messageIDMapper[channelId].get(rawId);
        if (channelId in this.database.messages) {
            this.database.messages[channelId][id] = message;
        } else {
            this.database.messages[channelId] = [message];
        }
        return id;
    }

    protected updateTitle(title: string): void {
        this.database.title = title;
    }
}
