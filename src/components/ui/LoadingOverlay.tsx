
interface LoadingOverlayProps {
    visible: boolean;
    text?: string;
}

export function LoadingOverlay({
    visible,
    text = "Loading...",
}: LoadingOverlayProps) {
    if (!visible) return null;

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
            <div className="rounded-xl border border-white/10 bg-black/55 p-10 lg:px-20 backdrop-blur-md">
                <div className="flex flex-col items-center gap-3">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-white" />

                    <p className="text-sm font-medium tracking-wide text-white whitespace-nowrap">
                        {text}
                    </p>
                </div>
            </div>
        </div>
    );
}