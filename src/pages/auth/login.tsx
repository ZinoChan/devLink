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
import { useState } from "react";

export default function Login() {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AuthInput>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: AuthInput) {
    try {
      setError(null);
      setIsSubmitting(true);
      localStorage.removeItem("access_token");
      await new Promise<void>((resolve, reject) => {
        auth.login(
          {
            username: values.email,
            password: values.password,
            realm: "Username-Password-Authentication",
            redirectUri: import.meta.env.VITE_REDIRECT_URI,
            responseType: "token id_token",
          },
          (err: Auth0Error | null) => {
            if (err) {
              reject(new Error(err.description || "Login failed"));
              return;
            }
            resolve();
          }
        );
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex items-center justify-center h-full">
      <section className="p-6">
        <header className="max-w-max mx-auto mb-8">
          <Logo />
        </header>

        <div className="w-96 mx-auto rounded-lg md:p-10 md:bg-white md:shadow-sm">
          {error && (
            <div className="bg-red/20 p-3 border-red rounded-sm mb-4">
              <p className="text-red">{error}</p>
            </div>
          )}
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
              <fieldset className="space-y-4" disabled={isSubmitting}>
                <legend className="sr-only">Login Form</legend>

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
                disabled={isSubmitting}
              >
                {isSubmitting ? <Loader className="animate-spin" /> : "Login"}
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
