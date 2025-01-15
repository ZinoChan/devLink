import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

type LinkErrAlertProps = {
  message?: string;
};

export default function LinkErrAlert({
  message = "Failed to load your links. Please refresh the page or try again later.",
}: LinkErrAlertProps) {
  return (
    <Alert variant="destructive" role="alert">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
