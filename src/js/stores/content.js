export default () => ({
    // PROPERTIES
    posts: [],
    replies: [],
    reviews: [],
    // INIT
    init() {
        this.posts = defaultsPosts;
        this.replies = defaultsReplies;
    },
    addPosts(posts) {
        this.posts.concat(posts);
    },
    addPost(post) {
        this.posts.push(post);
    },
    // METHODS
    createReview(post) {
        this.reviews.push({
            id: 91,
            parentId: post.id,
            userId: 0,
            profile: 'https://placehold.co/150x150',
            updated: '5 minutes ago',
            agree: false,
            disagree: false,
            like: false,
        })
    },
    createReply(reply){
        this.replies.push({
            id: this.items.length+'post',
            userId: 0,
            parentId: reply.parentId,
            username: 'John deere',
            profile: 'https://placehold.co/150x150',
            handle: '@jdeerer',
            updated: '5 minutes ago',
            content: reply.content,
            feed: 'Recipes',
            liked: false,
            agree: 22,
            disagree: 1,
        })
        console.log(this.replies)
        console.log('reply created');
    },
    createPost(post){
        this.items.push({
            id: this.items.length+'post',
            userId: 0,
            username: 'John deere',
            profile: 'https://placehold.co/150x150',
            handle: '@jdeerer',
            updated: '5 minutes ago',
            content: '<p><strong>title</strong></p><p>this is a new test of a auto-formatted markdown</p>',
            feed: 'Recipes',
            liked: false,
            agree: 22,
            disagree: 1,
        })
    },
    likePost(post){
        this.createPost(post);
    },
    disagreePost(post){
        console.log('disagree');
        this.createReply(post);
    },
    agreePost(post){
        console.log('agree');
        this.createReply(post);
    },
})

const defaultsPosts = [
    {
        id: 0,
        userId: 0,
        username: 'John deere',
        profile: 'https://placehold.co/150x150',
        handle: '@jdeerer',
        updated: '5 minutes ago',
        content: '<p><strong>title</strong></p><p>this is a new test of a auto-formatted markdown</p>',
        feed: 'Recipes',
        liked: false,
        agree: 22,
        disagree: 1,
    },
    {
        id: 1,
        userId: 0,
        profile: 'https://placehold.co/150x150',
        username: 'don doon',
        handle: '@dundoon',
        updated: '12 minutes ago',
        content: '<p>If any text contains no line breaks then we get everything in a full block of text</p>',
        agree: 16,
        disagree: 15,
        liked: true,
        feed: 'AI updates',
        favourited: true,
    },
    {
        id: 3,
        userId: 0,
        profile: 'https://placehold.co/150x150',
        username: 'jokarr',
        handle: '@johndoker',
        updated: '15 minutes ago',
        content: '<p><strong>what is the latest with ai</strong></p><p>here is a bunch of text to format</p>',
        feed: 'AI updates',
        liked: true,
        agree: 16,
        disagree: 15,
    },
    {
        id: 4,
        userId: 0,
        profile: 'https://placehold.co/150x150',
        username: 'tommy1989',
        handle: '@tommy1989',
        updated: '3 days ago',
        content: '<img src="https://placehold.co/2000x2000" alt="username_profile" />',
        feed: 'AI updates',
        liked: false,
        agree: 16,
        disagree: 15,
    },
];


const defaultsReplies = [
    {
        id: 10,
        userId: 0,
        username: 'John deere',
        profile: 'https://placehold.co/150x150',
        handle: '@jdeerer',
        updated: '5 minutes ago',
        content: 'My review is just a big problem',
        feed: 'Recipes',
        liked: false,
        agree: 22,
        disagree: 1,
    },
    {
        id: 11,
        userId: 0,
        profile: 'https://placehold.co/150x150',
        username: 'don doon',
        handle: '@dundoon',
        updated: '12 minutes ago',
        content: 'I need to think more about the content I write',
        agree: 16,
        disagree: 15,
        liked: true,
        favourited: true,
    },
    {
        id: 13,
        userId: 0,
        profile: 'https://placehold.co/150x150',
        username: 'jokarr',
        handle: '@johndoker',
        updated: '15 minutes ago',
        content: 'What do we do when we want to write more than to do what',
        liked: true,
        agree: 16,
        disagree: 15,
    },
    {
        id: 553,
        userId: 0,
        profile: 'https://placehold.co/150x150',
        username: 'jokarr',
        handle: '@johndoker',
        updated: '15 minutes ago',
        content: 'What do we do when we want to write more than to do what',
        liked: true,
        agree: 16,
        disagree: 15,
    },
    {
        id: 122,
        userId: 0,
        profile: 'https://placehold.co/150x150',
        username: 'jokarr',
        handle: '@johndoker',
        updated: '15 minutes ago',
        content: 'What do we do when we want to write more than to do what',
        liked: true,
        agree: 16,
        disagree: 15,
    },
];


const defaultsReviews = [
    {
        id: 91,
        userId: 0,
        profile: 'https://placehold.co/150x150',
        updated: '5 minutes ago',
        agree: false,
        disagree: false,
        like: false,
    },
    {
        id: 92,
        userId: 0,
        profile: 'https://placehold.co/150x150',
        updated: '5 minutes ago',
        agree: true,
        disagree: false,
        like: false,
    },
    {
        id: 93,
        userId: 0,
        profile: 'https://placehold.co/150x150',
        updated: '5 minutes ago',
        agree: true,
        disagree: false,
        like: false,
    },
    {
        id: 94,
        userId: 0,
        profile: 'https://placehold.co/150x150',
        updated: '5 minutes ago',
        agree: true,
        disagree: false,
        like: false,
    },
];