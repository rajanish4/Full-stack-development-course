const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className='confirmation'>
        {message}
      </div>
    )
  }
  
const ErrorNotification = ({ error }) => {
if (error === null) {
    return null
}

return (
    <div className='error'>
    {error}
    </div>
)
}

export default { Notification, ErrorNotification }