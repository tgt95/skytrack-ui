type ShowcaseBrandLinkProps = {
  logo: string
}

export function ShowcaseBrandLink({ logo }: ShowcaseBrandLinkProps) {
  return (
    <a
      href='/'
      aria-label='SkyTrack UI home'
      className='block h-5 [&>svg]:block [&>svg]:h-full [&>svg]:w-full'
      dangerouslySetInnerHTML={{ __html: logo }}
    />
  )
}
