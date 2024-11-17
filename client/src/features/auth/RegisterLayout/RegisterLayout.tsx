import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useCreateAccount } from "../api/hooks/useAuth";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import RoleSelection from "../components/RoleSelection/RoleSelection";
import PersonalDetails from "../components/PersonalDetails/PersonalDetails";
import Description from "../components/Description/Description";
import WorkImages from "../components/WorkImages/WorkImages";
import { User } from "../../../types";
import styles from './RegisterLayout.module.scss';

export default function RegisterLayout() {
    const [activeTab, setActiveTab] = useState(0);
    const { control, handleSubmit, setValue, getValues, formState: { errors }, watch } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            location: '',
            phoneNumber: '',
            description: '',
            role: '',
            group: [],
            profileImage: null,
            work: [],
        }
    });
    const { mutate: createAccount, isPending: isCreatingAccount } = useCreateAccount();

    const onSubmit = (data: User) => {
        const modifiedData = {
            ...data,
            location: data.location.value
        };

        createAccount(modifiedData)
    }

    return (
        <div className={styles.registerLayout}>
            <form className={styles.registerForm} onSubmit={handleSubmit((data) => onSubmit(data as User))}>
                {activeTab === 0 && <RoleSelection control={control} setActiveTab={setActiveTab} errors={errors} watch={watch} handleSubmit={handleSubmit} />}
                {activeTab === 1 && <PersonalDetails control={control} errors={errors} setActiveTab={setActiveTab} handleSubmit={handleSubmit} />}
                {activeTab === 2 && (
                    <WorkImages
                        control={control}
                        setValue={setValue}
                        getValues={getValues}
                        setActiveTab={setActiveTab}
                        errors={errors}
                        handleSubmit={handleSubmit}
                        watch={watch}
                    />
                )}
                {activeTab === 3 && <Description control={control} setActiveTab={setActiveTab} handleSubmit={handleSubmit} />}
                {activeTab === 4 && <RegisterForm control={control} errors={errors} setActiveTab={setActiveTab} isLoading={isCreatingAccount} />}
            </form>
        </div>
    );
}