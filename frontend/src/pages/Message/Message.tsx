import React, { useState } from "react";
import "./style.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";

const mockMessages = [
	{
		id: "chatID1",
		members: ["zeeshanID", "zeeshanID1"],
		name: "Chat 1",
		description: "Chat 1 description",
	},
	{
		id: "chatID2",
		members: ["zeeshanID", "zeeshanID1"],
		name: "Chat 2",
		description: "Chat 2 description",
	},
	{
		id: "chatID3",
		members: ["zeeshanID", "zeeshanID1"],
		name: "Chat 3",
		description: "Chat 3 description",
	},
];

const mockMessageContents: Record<string, any[]> = {
	chatID1: [
		{
			sentFrom: "zeeshanID",
			message: "Hello, how are you?",
			time: "3/24/2023, 7:32:31 PM",
			unreadBy: ["zeeshanID1"],
		},
	],
	chatID2: [
		{
			sentFrom: "zeeshanID1",
			message: "Good morning!",
			time: "3/24/2023, 7:37:51 AM",
			unreadBy: ["zeeshanID"],
		},
		{
			sentFrom: "zeeshanID",
			message: "Good morning to you too!",
			time: "3/24/2023, 7:45:23 AM",
			unreadBy: ["zeeshanID1"],
		},
	],
	chatID3: [
		{
			sentFrom: "zeeshanID",
			message: "Did you see the latest news?",
			time: "3/24/2023, 12:10:16 PM",
			unreadBy: ["zeeshanID", "zeeshanID1"],
		},
		{
			sentFrom: "zeeshanID1",
			message: "Yes, it's quite surprising!",
			time: "3/24/2023, 12:15:48 PM",
			unreadBy: ["zeeshanID"],
		},
		{
			sentFrom: "zeeshanID",
			message:
				"Did you see the latest news?Did you see the latest news?Did you see the latest news?Did you see the latest news?Did you see the latest news?",
			time: "3/24/2023, 12:10:16 PM",
			unreadBy: ["zeeshanID", "zeeshanID1"],
		},
		{
			sentFrom: "zeeshanID1",
			message: "Yes, it's quite surprising!",
			time: "3/24/2023, 12:15:48 PM",
			unreadBy: ["zeeshanID"],
		},
		{
			sentFrom: "zeeshanID",
			message:
				"Did you see the latest news?Did you see the latest news?Did you see the latest news?Did you see the latest news?Did you see the latest news?",
			time: "3/24/2023, 12:10:16 PM",
			unreadBy: ["zeeshanID", "zeeshanID1"],
		},
		{
			sentFrom: "zeeshanID1",
			message: "Yes, it's quite surprising!",
			time: "3/24/2023, 12:15:48 PM",
			unreadBy: ["zeeshanID"],
		},
		{
			sentFrom: "zeeshanID",
			message:
				"Did you see the latest news?Did you see the latest news?Did you see the latest news?Did you see the latest news?Did you see the latest news?",
			time: "3/24/2023, 12:10:16 PM",
			unreadBy: ["zeeshanID", "zeeshanID1"],
		},
		{
			sentFrom: "zeeshanID1",
			message: "Yes, it's quite surprising!",
			time: "3/24/2023, 12:15:48 PM",
			unreadBy: ["zeeshanID"],
		},
		{
			sentFrom: "zeeshanID",
			message:
				"Did you see the latest news?Did you see the latest news?Did you see the latest news?Did you see the latest news?Did you see the latest news?",
			time: "3/24/2023, 12:10:16 PM",
			unreadBy: ["zeeshanID", "zeeshanID1"],
		},
		{
			sentFrom: "zeeshanID1",
			message: "Yes, it's quite surprising!",
			time: "3/24/2023, 12:15:48 PM",
			unreadBy: ["zeeshanID"],
		},
	],
};

const StyledIcon = styled(AccountCircleIcon)({
	fontSize: 67,
	color: "#666666",
});

const StyledMessageIcon = styled(AccountCircleIcon)({
	fontSize: 48,
	color: "#666666",
});

const StyledSentButton = styled(SendIcon)({
	fontSize: 44,
	color: "#666666",
});

interface InputFieldProps {
	onInputChange: (value: string) => void;
	value: string;
}

type SentButtonProps = {
	onSubmit: () => void;
};

const InputField: React.FC<InputFieldProps> = ({ onInputChange, value }) => (
	<input
		className="chat-input"
		type="text"
		placeholder="Write a message"
		style={{ paddingLeft: "28px" }}
		value={value}
		onChange={(e) => onInputChange(e.target.value)}
	/>
);
const SentButton: React.FC<SentButtonProps> = ({ onSubmit }) => (
	<IconButton
		sx={{
			display: "flex",
			marginLeft: "13px",
			alignItems: "center",
		}}
		onClick={onSubmit}
	>
		<StyledSentButton />
	</IconButton>
);
interface MessagesNumberProps {
	number: number;
}

const MessagesNumber = ({ number }: MessagesNumberProps) => (
	<div className="messages-new-notify">{number} new.</div>
);

interface MessageCardProps {
	icon: React.ReactElement<typeof AccountCircleIcon>;
	name: string;
	message: string;
	isUnread: boolean;
	onClick: () => void;
}

const MessageCard = ({
	icon,
	name,
	message,
	isUnread,
	onClick,
}: MessageCardProps) => (
	<div
		className={`messages-container-cards${
			isUnread ? " unread-messages-container-cards" : ""
		}`}
		onClick={onClick}
	>
		<div className="message-card-inner-div">
			<div className="card-icon-div">{icon}</div>
			<div className="card-content-wrapper">
				<div className="card-name-div">{name}</div>
				<div className="card-content-div">{message}</div>
			</div>
		</div>
	</div>
);

const Message = () => {
	const currentUserID = "zeeshanID";
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState<MessageType[]>([]);

	type MessageType = {
		id: string;
		sentFrom: string;
		message: string;
	};

	function sendMessage(content: string) {
		const newMessage = {
			id: `messageID${Object.keys(mockMessageContents).length + 1}`,
			sentFrom: "this-user",
			message: content,
		};

		// Add the message to the mockMessageContents array
		if (selectedChat) {
			if (mockMessageContents[selectedChat.id]) {
				mockMessageContents[selectedChat.id].push(newMessage);
			} else {
				mockMessageContents[selectedChat.id] = [newMessage];
			}
		}

		return newMessage;
	}

	function addMessageToUI(newMessage: MessageType) {
		setMessages([...messages, newMessage]);
	}

	function handleSubmit() {
		if (!message.trim()) {
			return;
		}

		// Call the sendMessage function and handle the response
		const newMessage = sendMessage(message);

		// Update the chat UI with the new message
		addMessageToUI(newMessage);

		// Clear the message state
		setMessage("");
	}

	const [selectedChat, setSelectedChat] = useState<
		null | typeof mockMessages[0]
	>(null);

	const handleChatSelection = (chat: typeof mockMessages[0]) => {
		setSelectedChat(chat);
		setMessages([...mockMessageContents[chat.id]]);
	};

	const messageCards = mockMessages.map((chat) => {
		const isUnread = mockMessageContents[chat.id]?.some((message) =>
			message.unreadBy?.includes(currentUserID)
		);

		return (
			<MessageCard
				key={chat.id}
				icon={<StyledIcon />}
				name={chat.name}
				message={chat.description}
				isUnread={!!isUnread}
				onClick={() => handleChatSelection(chat)}
			/>
		);
	});

	const renderMessages = () => {
		if (selectedChat !== null) {
			return messages.map((message, index) => (
				<div
					key={index}
					className={`chat-content-container ${
						message.sentFrom === currentUserID
							? "chat-content-container-from-this-user"
							: "chat-content-container-from-other-user"
					}`}
				>
					{message.sentFrom === currentUserID ? (
						<div className="message-icon-div-right">
							<StyledMessageIcon />
						</div>
					) : (
						<div className="message-icon-div">
							<StyledMessageIcon />
						</div>
					)}
					<div
						className={`chat-message-content ${
							message.sentFrom === currentUserID
								? "chat-message-content-from-this-user"
								: "chat-message-content-from-other-user"
						}`}
					>
						<div className="chat-message-content-inner">
							{message.message}
						</div>
					</div>
				</div>
			));
		}
		return <div>Select a chat to display messages</div>;
	};

	return (
		<div className="message">
			<div className="title-container">
				<h1 className="messages-title">Messages</h1>
				<MessagesNumber number={1} />
			</div>
			<div className="messages-container">
				<div className="messages-container-left">{messageCards}</div>
				<div className="messages-container-right">
					<div className="chat-name-div">
						{selectedChat !== null
							? mockMessages.find(
									(chat) => chat.id === selectedChat.id
							  )?.name
							: "No chat selected"}
					</div>
					<div className="chat-container">{renderMessages()}</div>
					<div className="chat-input-div">
						<InputField
							onInputChange={(value) => setMessage(value)}
							value={message}
						/>

						<SentButton onSubmit={handleSubmit} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Message;
