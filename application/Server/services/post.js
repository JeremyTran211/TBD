const db = require('./db');
const helper = require('../helper');
const config = require('../config');


// for creating a post
async function createPost(post) {
    const result = await db.query(
        `INSERT INTO Posts (Posts_ID, User_ID, Post_Content) 
        VALUES ("${post.Posts_ID}", "${post.User_ID}", "${post.Post_content$}")`);
    let message = 'Error in creating post';

    if (result.affectedRows) {
        message = 'Post created successfully';
    }
    return { success: true };
}

// for retrieving and reading the posts in the posts Table
async function getPosts(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT Posts_ID, User_ID,Post_Content, Like_Counter
    FROM Posts LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };
    return {
        data,
        meta
    }
}

// for updating post and gives status of operation
async function updatePost(post_id, post) {
    const query = `UPDATE Posts SET  
    User_ID =IF("${post.User_ID}" = "undefined", User_ID, "${post.User_ID}"), 
    Post_Content =IF("${post.Post_Content}" = "undefined", Post_Content, "${post.Post_Content}") 
    WHERE Posts_ID = ${post_id} `

    let message = 'Error in updating post';
    const result = await db.query(query)
    if (result.affectedRows) {
        message = 'Post updated successfully';
    }
    return { message };
}

// for deleting a post
async function removePost(post_id) {
    const result = await db.query(
        `DELETE FROM Posts WHERE Posts_ID=${post_id}`
    );

    let message = 'Error in deleting post';

    if (result.affectedRows) {
        message = 'Post was deleted successfully';
    }

    return { message };
}


module.exports = {
    getPosts,
    updatePost,
    removePost,
    createPost
}
