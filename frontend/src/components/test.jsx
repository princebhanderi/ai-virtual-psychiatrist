return (
  <>
    <NavBar />
    <div className="flex flex-col items-center min-h-[90vh] bg-gradient-to-br from-blue-100 to-purple-200 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-950 pb-20">
      <div className="bg-gradient-to-r from-yellow-600 via-pink-600 to-blue-600 dark:bg-gradient-to-r dark:from-yellow-500 dark:via-pink-500 dark:to-blue-500 bg-clip-text text-transparent font-semibold text-2xl text-center mt-3 mb-2">
        {hasHistory ? "Your Chat History" : "Start a New Conversation"}
      </div>

      {error && !error.includes("404") && (
        <div className="text-red-600 dark:text-red-400 p-3 mb-4 bg-white/80 dark:bg-gray-800/80 rounded-lg max-w-3xl w-full text-center">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-4 w-full max-w-3xl px-4 h-[70vh] overflow-y-auto mb-4">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex flex-col max-w-[85%] rounded-2xl px-4 py-3 break-words ${
                msg.type === "user"
                  ? "self-end bg-gradient-to-br from-blue-500 to-green-500 text-white rounded-tr-none"
                  : "self-start bg-gradient-to-br from-sky-200 to-indigo-100 dark:from-gray-700 dark:to-gray-600 text-gray-800 dark:text-gray-100 rounded-tl-none"
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-xs">
                  {msg.type === "user" ? "You" : "Assistant"}
                </span>
                <span className="text-xs opacity-70">
                  {formatTimestamp(msg.timestamp)}
                </span>
              </div>
              <div className="whitespace-pre-wrap">
                {msg.content}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-600 dark:text-gray-400 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
            {hasHistory 
              ? "No messages in this conversation yet." 
              : "No conversations found. Start chatting below!"}
          </div>
        )}
      </div>

      <div className="fixed bottom-4 w-full max-w-3xl px-4 flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Type your message..."
          className="flex-1 p-3 rounded-lg bg-white/90 dark:bg-gray-700/90 focus:outline-none text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 shadow-md"
          disabled={isSending}
        />
        <button
          onClick={handleSendMessage}
          disabled={isSending || !message.trim()}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg disabled:opacity-50 shadow-md transition-all duration-200 flex items-center justify-center min-w-[100px]"
        >
          {isSending ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending
            </>
          ) : "Send"}
        </button>
      </div>
    </div>
  </>
);