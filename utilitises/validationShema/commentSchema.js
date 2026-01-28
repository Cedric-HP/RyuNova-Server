import * as yup from 'yup';

export const commentSchema = yup.object({
    contentId: 
        yup.number()
        .required('contentId is required'),
    contentType: 
        yup.string()
        .required('contentType is required')
        .oneOf(['image', 'article']),
    targetCommentId: 
        yup.number()
        .required('targetCommentId is required'),
    comment:
        yup.string()
        .required("Comment content is required")
        .min(1, 'Comment must be at least 1 characters')
        .max(1000, 'Comment must be fewer than 1000 characters'),
    isReply:
        yup.boolean()
        .required("isRepl content is required")
});