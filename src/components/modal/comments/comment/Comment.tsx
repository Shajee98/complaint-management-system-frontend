import './Comment.scss'

interface Props {
    staff: string
    comment: any
}

const Comment = ({staff, comment}: Props) => {
  return (
    <div className='comment-container'>
      <h2 className='staff-name'>{staff}</h2>
      <p className='comment'>{comment.comment}</p>
      <p className='timestamp'>{comment.createdAt}</p>
    </div>
  )
}

export default Comment
