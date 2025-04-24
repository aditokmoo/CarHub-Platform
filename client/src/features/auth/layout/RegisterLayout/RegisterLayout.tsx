import { useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
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
    const form = useForm<FieldValues>({
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
    const { mutate: createAccount, isPending: isCreatingAccount } = useCreateAccount(form.reset);

    const onSubmit = (data: User) => {
        const userData = formatUserData(data);
        console.log(data)
        createAccount(userData as User)
    };

    return (
        <div className={styles.registerLayout}>
            <FormProvider {...form}>
                <form className={styles.registerForm} onSubmit={form.handleSubmit((data) => onSubmit(data as User))}>
                    {activeTab === 0 && <RoleSelection setActiveTab={setActiveTab} />}
                    {activeTab === 1 && <PersonalDetails setActiveTab={setActiveTab} />}
                    {activeTab === 2 && <WorkImages setActiveTab={setActiveTab} />}
                    {activeTab === 3 && <Description setActiveTab={setActiveTab} />}
                    {activeTab === 4 && <RegisterForm setActiveTab={setActiveTab} isLoading={isCreatingAccount} />}
                </form>
            </FormProvider>
        </div>
    );
}