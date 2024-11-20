import { User } from "../types";
import useLocalStorage from "./useLocalStorage";

export default function useArchiveProviders() {
    const [archive, setArchive] = useLocalStorage('archivedProviders', []);

    const toggleArchive = (serviceProviderData: User) => {
        console.log(serviceProviderData);

        const isArchived = archive.some(
            (provider) => provider.name === serviceProviderData.name
        );

        if (isArchived) {
            const updatedArchive = archive.filter(
                (provider) => provider.name !== serviceProviderData.name
            );
            setArchive(updatedArchive);
        } else {
            const updatedArchive = [...archive, serviceProviderData];
            setArchive(updatedArchive);
        }
    };

    return {
        archive,
        toggleArchive,
    };
}
