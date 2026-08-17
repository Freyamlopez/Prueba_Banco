import { X } from "lucide-react";
import type { ReactNode } from "react";

interface ModalProps {
    title: string;
    onClose: () => void;
    children: ReactNode;
}

export default function Modal({ title, onClose, children }: ModalProps) {
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X size={22} />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}