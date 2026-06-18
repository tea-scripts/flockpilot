import { redirect } from 'next/navigation';
import { appSignupUrl } from '../../lib/config';

// The marketing site no longer creates accounts — auth is unified on the app.
// Forward any ?trial / ?plan params straight to the app's signup.
export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const usp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (typeof v === 'string') usp.set(k, v);
    else if (Array.isArray(v) && v[0]) usp.set(k, v[0]);
  }
  redirect(appSignupUrl(usp.toString()));
}
