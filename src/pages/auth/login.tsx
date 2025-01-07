import { AuthInput, authSchema } from "@/validation/auth.schema";
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
import { Link } from "react-router";
import { Loader, LockIcon, MailIcon } from "lucide-react";
import { Logo } from "@/components/logo";
import { auth } from "@/services/auth0.service";
import { Auth0Error } from "auth0-js";

export default function Login() {
  const form = useForm<AuthInput>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: AuthInput) {
    try {
      auth.login(
        {
          username: values.email,
          password: values.password,
          realm: "Username-Password-Authentication",
          redirectUri: "http://localhost:5173/callback",
          responseType: "token id_token",
        },
        function (err: Auth0Error | null, result: unknown) {
          if (err) {
            console.error(err);
            return;
          }
          console.log(result);
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  const isPending = form.formState.isSubmitting;

  return (
    <main className="flex items-center justify-center h-full">
      <section className="p-6">
        <header className="max-w-max mx-auto mb-8">
          <Logo />
        </header>

        <div className="w-full max-w-md mx-auto rounded-lg md:p-10 md:bg-white md:shadow-sm">
          <div className="mb-4">
            <h1 className="text-dark-grey text-2xl font-bold mb-2 md:text-[32px]">
              Login
            </h1>
            <p className="text-grey">
              Let's get you started sharing your links!
            </p>
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
                      <FormLabel className="text-grey-dark">Password</FormLabel>
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
              </fieldset>

              <button
                className="mt-6 mb-6 font-semibold disabled:bg-grey text-white h-[46px] w-full flex items-center justify-center rounded-lg bg-purple disabled:opacity-50 disabled:cursor-not-allowed lg:hover:bg-purple-hover lg:transition-colors"
                type="submit"
                disabled={isPending}
              >
                {isPending ? <Loader className="animate-spin" /> : "Login"}
              </button>

              <p className="text-grey text-center">
                don't have an account?{" "}
                <Link
                  className="text-purple hover:underline focus:outline-none focus:ring-2 focus:ring-purple focus:ring-offset-2 rounded-sm"
                  to="/register"
                >
                  Register
                </Link>
              </p>
            </form>
          </Form>
        </div>
      </section>
    </main>
  );
}
