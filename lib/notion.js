const {
    Client
} = require('@notionhq/client');

// Initializing a client
const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

function toSlug(text) {
    return text.toLowerCase().replace(/ /g, '-').replace(/[-]+/g, '-').replace(/[^\w-]+/g, '');
}

async function queryPostDatabase() {
    return notion.databases.query({
        database_id: '163801a913214dcb92702b1bf84e39e8',
        sorts: [{
            "property": "Date",
            "direction": "descending"
        }]
    });
}

export async function getAllPosts() {
    const allPosts = await queryPostDatabase();
    return allPosts.results.map(e => {
        const title = e
            .properties
            .Title
            .title
            .map(k => k.plain_text)
            .join(' ');
        const date = new Date(e.properties.Date.date.start).toISOString();

        return {
            notionId: e.id,
            id: e.id,
            slug: toSlug(title),
            title,
            date,
        }
    })
}

export async function getAllPostIds() {
    const allPosts = await queryPostDatabase();

    return allPosts.results.map(e => {
        const title = e
            .properties
            .Title
            .title
            .map(k => k.plain_text)
            .join(' ');
        const date = new Date(e.properties.Date.date.start).toISOString();

        return {
            params: {
                notionId: e.id,
                id: e.id,
            }
        }
    })
}

export async function getPostData(id) {
    const block = await notion.blocks.children.list({
        block_id: id,
    });
    
    // const title = e
    //     .properties
    //     .Title
    //     .title
    //     .map(k => k.plain_text)
    //     .join(' ');
    const text = block.results.map(e => e.paragraph.text).map(e => e.map(k=>k.plain_text)).flat().join(' ')
    return {
        notionId: id,
        // title,
        text,
    }
}