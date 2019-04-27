const createComment = (id, value, user, blogID, targetComment)=>({
    id,
    description: value,
    user_id: user.id,
    user_name: user.nickname,
    user_avatar: user.avatar.origin,
    commentable_id: blogID,
    commentable_type: 'Article',
    like_times: 0,
    created_at: new Date().toString(),
    updated_at: new Date().toString(),
    parent_comment: targetComment?targetComment:null
})

export {createComment}