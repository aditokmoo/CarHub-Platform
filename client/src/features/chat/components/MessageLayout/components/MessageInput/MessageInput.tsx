import { useForm, SubmitHandler } from 'react-hook-form';
import { useSendMessage } from '../../../../hooks/useChat';
import { MessageFormInputs, MessageInputProps } from '../../../../types';
import { useAuthContext } from '../../../../../auth/context/auth.context';
import styles from './MessageInput.module.scss';
import useSocket from '../../../../../../hooks/useSocket';

export default function MessageInput({ receiverId }: MessageInputProps) {
    const { register, handleSubmit, reset } = useForm<MessageFormInputs>();
    const { state } = useAuthContext();
    const { mutate: sendMessage, isPending: isSendingMessage } = useSendMessage(receiverId!);
    const { socket } = useSocket(state.currentUser!);

    if (isSendingMessage) return <h2>Loading</h2>

    const onSubmit: SubmitHandler<MessageFormInputs> = (data) => {

        console.log('Receiver: ', receiverId)
        console.log('Sender: ', state.userId)
        sendMessage(data.message, {
            onSuccess: (data) => {
                socket?.emit('sendMessage', data)
            }
        });

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