
const NotLoggedInHome = () => {
  return (
    <div className="flex flex-col gap-5 items-center">
 
    <a href="/sign-in">
      <button type="submit">Sign In</button>
    </a>
    <a href="/sign-up">
      <button type="submit">Sign Up</button>
    </a>
  </div>
  )
}

export default NotLoggedInHome