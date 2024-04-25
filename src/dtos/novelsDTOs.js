


export class NovelDTO {
    id;
    mainTitle;
    rusTitle;
    description;
    duration;
    cover;
    orgAuthor;
    orgTranslate;
    publishedId;
    createdAt;
    updatedAt;


    constructor(data) {
        this.id = data.id;
        this.mainTitle = data.mainTitle;
        this.rusTitle = data.rusTitle;
        this.description = data.description;
        this.duration = data.duration;
        this.cover = data.cover;
        this.orgAuthor = data.orgAuthor;
        this.orgTranslate = data.orgTranslate;
        this.publishedId = data.publishedId;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    };
}
