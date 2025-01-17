import { ReactNode } from "react";

type QueryResultProps<TData> = {
  loading: boolean;
  error?: Error | null;
  LoaderComponent: ReactNode;
  ErrComponent: ReactNode;
  data?: TData | null;
  children: ReactNode;
};

export function QueryResult<TData>({
  loading,
  error,
  LoaderComponent,
  ErrComponent,
  data,
  children,
}: QueryResultProps<TData>) {
  if (error) return <>{ErrComponent}</>;
  if (loading) return <>{LoaderComponent}</>;
  if (data) return <>{children}</>;

  return <p>Nothing to show...</p>;
}
