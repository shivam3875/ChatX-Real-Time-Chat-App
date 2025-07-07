import { useEffect } from 'react'
import ConversationCard from './ConversationCard'
import { useUsersContext } from './Context/UsersContext'
import useConversations from './hooks/useConversations'
import AllUsersSkeleton from './AllUsersSkeleton'

const Conversations = () => {

  const {users} = useUsersContext()
  const {loading,conversations} = useConversations()

  useEffect(()=>{
    conversations() ;
  },[])


  return (
    <div className='max-h-[22.5rem] overflow-y-auto min-h-[22.5rem] flex flex-col '>

       {  users===null ? <>
        <AllUsersSkeleton/>
      </> :
       users?.map((user)=>{
          return <ConversationCard key={user._id} user={user} />
       })}
    </div>
  )
}

export default Conversations
