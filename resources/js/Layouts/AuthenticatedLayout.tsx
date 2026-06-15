import NavBar from "@/Components/App/NavBar";
import { usePage } from "@inertiajs/react";
import {
  PropsWithChildren,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

export default function AuthenticatedLayout({
  header,
  children,
}: PropsWithChildren<{ header?: ReactNode }>) {
  const props = usePage().props;
  const user = props.auth.user;

  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false);

  const [successMessage, setSuccessMessage] = useState<any[]>([]);
  const timeoutRefs = useRef<{ [key: number]: ReturnType<typeof setTimeout> }>(
    {}
  ); //store timeouts by message ID

  useEffect(() => {
    if (props.success.message) {
      const newMessage = {
        ...props.success,
        id: props.success.time, // use time as the unique identifier
      };

      // add the new message to the list - infront of the previous messages - so the latest messages appear first.
      setSuccessMessage((prevMessages) => [newMessage, ...prevMessages]);

      // set a timeout for this specific message
      const timeoutId = setTimeout(() => {
        // filter the new message and remove that from the message list

        /* After 50 seconds, the timeout callback will remove this specific message(newMessage) from the array by filtering out the message with the same id. */

        setSuccessMessage((prevMessages) =>
          prevMessages.filter((msg) => msg.id !== newMessage.id)
        );

        // clear timeout from refs after execution of the current message
        // Also cleans up the timeoutRefs by deleting the reference for this id once the timeout is executed.
        delete timeoutRefs.current[newMessage.id];
      }, 10000);

      // When you create a setTimeout, it returns a timeout ID - store it using the message ID as the key
      timeoutRefs.current[newMessage.id] = timeoutId;
    }
  }, [props.success]);

  return (
    <div className="min-h-screen bg-orange-100 dark:bg-orange-900">
      <NavBar />

      {props.error && (
        <div className="container mx-auto px-8 mt-8">
          <div className="alert alert-error">{props.error}</div>
        </div>
      )}

      {successMessage.length > 0 && (
        <div className="toast toast-top toast-end z-[1000] mt-16">
          {successMessage.map((msg) => (
            <div className="alert alert-success text-white" key={msg.id}>
              <span>{msg.message}</span>
            </div>
          ))}
        </div>
      )}

      <main>{children}</main>
    </div>
  );
}
