import { useForm, SubmitHandler } from 'react-hook-form';
import { useSendMessage } from '../../../../hooks/useChat';
import { MessageFormInputs, MessageInputProps } from '../../../../types';
import styles from './MessageInput.module.scss';

export default function MessageInput({ receiverId }: MessageInputProps) {
    const { register, handleSubmit, reset } = useForm<MessageFormInputs>();
    const { mutate: sendMessage, isPending: isSendingMessage } = useSendMessage(receiverId!);

    if (isSendingMessage) return <h2>Loading</h2>

    const onSubmit: SubmitHandler<MessageFormInputs> = (data) => {
        sendMessage(data.message);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.messageInput}>
            <input
                type="text"
                placeholder="Type your message here..."
                {...register('message', { required: true })}
            />
            <button type="submit">Send</button>
        </form>
    );
}