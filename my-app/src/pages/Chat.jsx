function Chat() {
    
  return (
    <div>
      <h1>Chat Page</h1>
      <p>Welcome to the chat! Feel free to ask any questions or share your thoughts.</p>
      <div className="chat-box">
        <div className="message received">Hello! How can I assist you today?</div>
       
      </div>
      
      

        <form>
          <input type="text" placeholder="Type your message..." />
          <button type="submit">Send</button>
        </form>
    </div>
  );
}

export default Chat;