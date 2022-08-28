import type { NextPage } from 'next'

const Typography: NextPage = () => {
  return (
    <>
      <h1 className="headline1">Headline1</h1>
      <h2 className="headline2">Headline2</h2>
      <h3 className="headline3">Headline3</h3>
      <h4 className="headline4">Headline4</h4>
      <h5 className="headline5">Headline5</h5>
      <h6 className="headline6">Headline6</h6>
      <div className="subtitle1">Subtitle1</div>
      <div className="subtitle2">Subtitle2</div>
      <div className="body1">Body1</div>
      <div className="body2">Body2</div>
      <div className="caption">Caption</div>
      <div className="button">Button</div>
      <div className="text-container">
        <p className="body1">
          Space, the final frontier. These are the voyages of the Starship
          Enterprise. Its five-year mission: to explore strange new worlds, to
          seek out new life and new civilizations, to boldly go where no man has
          gone before.
        </p>
        <p className="body2">
          Many say exploration is part of our destiny, but it’s actually our
          duty to future generations and their quest to ensure the survival of
          the human species.
        </p>
      </div>
    </>
  )
}

export default Typography
