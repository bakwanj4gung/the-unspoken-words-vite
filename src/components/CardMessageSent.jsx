import { getLetterByUser } from "@/actions/letter/getByUser";
import ListMessageSent from "./ListMessageSent";

export default async function CardMessageSent({ cookie }) {
    const letters = await getLetterByUser(cookie);
    if (cookie == "unknown" || letters == []) return;
    return (
        <div className="whitespace-nowrap max-h-40 overflow-y-auto text-xs transition-all duration-500 border h-fit mt-8 px-6 py-4 rounded-lg md:mx-auto md:max-w-xl shadow-lg">
            <p className="mb-2 font-bold">History</p>
            <ListMessageSent data={letters} />
        </div>
    );
}
