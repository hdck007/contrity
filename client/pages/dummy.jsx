import { useSession, signIn, signOut, getSession } from "next-auth/react"

export default function Login() {
  const { data: session } = useSession()
  const something = getSession();

  console.log(session);

  return (
    <div className="h-screen overflow-hidden flex justify-center items-center">
      <div className="card w-96 shadow-xl">
        <div className="card-body">
          <h1 className="text-center text-2xl bold my-6" >Login with github</h1>
          {(session) ? (
            <>
              <button
                className="btn btn-primary"
                onClick={() => signOut()}>Sign out</button>
            </>
          )
            : (
              <>
                <button
                  className="btn btn-primary"
                onClick={() => signIn()}>Sign in</button>
              </>
            )}
        </div>
      </div>
    </div>
  )
}