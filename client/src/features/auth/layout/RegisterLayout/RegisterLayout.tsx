import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useCreateAccount } from "../../api/hooks/useAuth";
import { formatUserData } from "../../utils/authHelpers";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import RoleSelection from "../../components/RoleSelection/RoleSelection";
import PersonalDetails from "../../components/PersonalDetails/PersonalDetails";
import Description from "../../components/Description/Description";
import WorkImages from "../../components/WorkImages/WorkImages";
import { User } from "../../types";
import styles from './RegisterLayout.module.scss';

export default function RegisterLayout() {
    const [activeTab, setActiveTab] = useState(0);
    const { control, handleSubmit, setValue, getValues, reset, formState: { errors }, watch } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            profileImage: null,
            location: '',
            phoneNumber: '',
            role: '',
            group: [],
            experience: 0,
            description: '',
            numberOfWorkers: 1,
            numberOfServiceBays: 1,
            work: [],
        }
    });
    const { mutate: createAccount, isPending: isCreatingAccount } = useCreateAccount(reset);

    const onSubmit = (data: User) => {
        const userData = formatUserData(data);
        console.log(userData)
        createAccount(userData as User)
    };

    return (
        <div className={styles.registerLayout}>
            <form className={styles.registerForm} onSubmit={handleSubmit((data) => onSubmit(data as User))}>
                {activeTab === 0 && <RoleSelection control={control} setActiveTab={setActiveTab} errors={errors} watch={watch} handleSubmit={handleSubmit} />}
                {activeTab === 1 && <PersonalDetails control={control} errors={errors} setActiveTab={setActiveTab} handleSubmit={handleSubmit} role={getValues('role')} />}
                {activeTab === 2 && <WorkImages control={control} setValue={setValue} getValues={getValues} setActiveTab={setActiveTab} errors={errors} handleSubmit={handleSubmit} />}
                {activeTab === 3 && <Description control={control} setActiveTab={setActiveTab} handleSubmit={handleSubmit} />}
                {activeTab === 4 && <RegisterForm control={control} errors={errors} setActiveTab={setActiveTab} isLoading={isCreatingAccount} role={getValues('role')} />}
            </form>
        </div>
    );
}