import { RegisterInput, registerSchema } from "@/validation/auth.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router";
import { Loader, LockIcon, MailIcon } from "lucide-react";
import { Logo } from "@/components/logo";
import { auth } from "@/services/auth0.service";
import { Auth0Error } from "auth0-js";
import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();
  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const isPending = form.formState.isSubmitting;

  async function onSubmit(values: RegisterInput) {
    try {
      auth.signup(
        {
          email: values.email,
          password: values.password,
          connection: "Username-Password-Authentication",
        },
        function (err: Auth0Error | null, result: unknown) {
          if (err) {
            console.error(err);
            return;
          }
          console.log(result);
          toast.success("Registration successful! Please log in.");
          navigate("/");
        }
      );
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred.");
    }
  }

  return (
    <section className="p-6">
      <header className="max-w-max mx-auto mb-8">
        <Logo />
      </header>

      <div className="w-full max-w-md mx-auto rounded-lg md:p-10 md:bg-white md:shadow-sm">
        <div className="mb-4">
          <h1 className="text-dark-grey text-2xl font-bold mb-2 md:text-[32px]">
            Create account
          </h1>
          <p className="text-grey">Let's get you started sharing your links!</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
            <fieldset className="space-y-4" disabled={isPending}>
              <legend className="sr-only">Registration Form</legend>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-grey-dark">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="e.g. alex@email.com"
                        autoComplete="email"
                        icon={<MailIcon className="w-4 h-4" />}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-grey-dark">
                      Create Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="At least 8 characters"
                        autoComplete="new-password"
                        icon={<LockIcon className="w-4 h-4" />}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-grey-dark">
                      Confirm password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="At least 8 characters"
                        autoComplete="new-password"
                        icon={<LockIcon className="w-4 h-4" />}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <p className="text-grey text-xs">
                Password must contain at least 8 characters
              </p>
            </fieldset>

            <button
              className="mt-6 mb-6 font-semibold text-white h-[46px] w-full flex items-center justify-center rounded-lg bg-purple disabled:opacity-50 disabled:cursor-not-allowed lg:hover:bg-purple-hover lg:transition-colors"
              type="submit"
              disabled={isPending}
            >
              {isPending ? (
                <Loader className="animate-spin" />
              ) : (
                "Create new account"
              )}
            </button>

            <p className="text-grey text-center">
              Already have an account?{" "}
              <Link
                className="text-purple hover:underline focus:outline-none focus:ring-2 focus:ring-purple focus:ring-offset-2 rounded-sm"
                to="/"
              >
                Login
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </section>
  );
}
