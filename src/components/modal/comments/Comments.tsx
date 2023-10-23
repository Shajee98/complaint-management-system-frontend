import { useEffect, useState } from 'react'
import './Comments.scss'
import Comment from './comment/Comment'
import Heading2 from '../../typography/heading-2/Heading2'
import { BsSendFill } from 'react-icons/bs'
import { AiFillCloseCircle } from 'react-icons/ai'
import { addComment, getComments } from './services/Comment'

interface Props {
    complaintId: number
    onClose: () => void
}

const Comments = ({complaintId, onClose} : Props) => {
  const [newComment, setNewComment] = useState('') 
  const [comments, setComments] = useState<any[]>([]) 
  const fetchComments = async () => {
        const comments = await getComments({complaint_id: complaintId})
        setComments(comments.data.data.comments)
  }

  const addNewComment = async () => {
    try {
        const comment = await addComment({complaint_id: complaintId, comment: newComment})
        setNewComment("")
        fetchComments()
    } catch (error) {
        console.log(error)
      }
    }

  useEffect(() => {
    fetchComments()
  },[])
  return (
    <div className='comments-modal'>
        <div className='modal-header'>
            <Heading2 text='Comments' />
            <AiFillCloseCircle onClick={onClose} className='comment-modal-cross'/>
        </div>
    <div className='comments-container'>
      {comments.map((comment) => (
        <Comment comment={comment} staff={comment.user.first_name + " " + comment.user.last_name}/>
      ))}
    </div>
    <div className='add-comment-container'>
      <input type="text" placeholder='Add comment' className='add-comment-input' onChange={(e) => setNewComment(e.target.value)} value={newComment}/>
      <BsSendFill className='send-icon' onClick={addNewComment}/>
    </div>
    </div>
  )
}

export default Comments