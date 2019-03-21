import React, { createContext, Component } from 'react';
import './App.css';

/**
 * * * * * * * * * * *  
 * SHARED CONTEXT
 * * * *
 * START
 */

// COULD HAVE SEPARATE REDUCER FOR DATA.SERIES.DATA?
const NavContext = React.createContext(null);
const MainContext = React.createContext(null);

const selectedContext = createContext({
  isSelected: 'selected',
  isNotSelected: 'not-selected'
})

const userContextContext = createContext({
  isAuthorized: false
})

/**
 * SHARED CONTEXT
 * * *
 * END
 * * * * * * * * * * *  
 * APP LAYOUT
 * * * *
 * START
 */
const Header = ({ children }) => (
  <div className={'header center-content'}>
    {children}
  </div>
)

const Navigation = ({ children }) => (
  <div className={'navigation'}>
    {children}
  </div>
)

const Main = ({ children }) => (
  <div className={'main'}>
    {children}
  </div>
)

const Footer = ({ children }) => (
  <div className={'footer'}>
    {children}
  </div>
)


/**
 * APP LAYOUT
 * * *
 * END
 * * * * * * * * * * *  
 * REDUCER FUNCTION
 * 
 * INITIAL STATE
 * *
 * START
 */

const raceData = {
  races: [
    {
      id: 1,
      name: 'race 1'
    },
    {
      id: 2,
      name: 'race 2'
    },
    {
      id: 3,
      name: 'race 3'
    }
  ],
  participants: [
    {
      id: 1,
      name: 'Taylor',
      races: [1, 2]
    },
    {
      id: 2,
      name: 'Chaco',
      races: [2, 3]
    },
    {
      id: 3,
      name: 'Thunder-butt',
      races: [1, 3]
    }
  ]
}

class App extends Component {
  state = {
    categories: ['Participants', 'Races'],
    races: { ...raceData.races },
    participants: { ...raceData.participants }
  }

  componentDidMount() {
    // console.log(this.state.races, this.state.participants);
  }

  handleCategoryClick(e) {
    console.log(e.target.innerHTML);

  }


  render() {
    return (
      <div className="App">
        <Header className={'header'}>
          <h1>
            [undefined] Race Series
          </h1>
        </Header>

        <Navigation className={'navigation'}>
          <h3 className={'title'}>
            Categories
          </h3>
          {this.state.categories.map((el, i) => (
            <div
              key={el + i}
              data-name={el}
              className={'list-item'}
              onClick={this.handleCategoryClick}>
              {el}
            </div>
          ))}
        </Navigation>

        <Main className={'main'}>
          <div className={'form-container'}>
            <form
              className={'center-content signin-form'}

            >
              <div>
                <h2
                  className={'title center-content'}>
                  Sign in
                  </h2>
                <label
                  for="textInput"
                  className={'label'}>
                  Email:
                  </label>
                <input
                  id="textInput"
                  className={"custom-input"}
                  size="18" />
                <input
                  className={'submit-button'}
                  type='submit'
                  size='large' />
              </div>
            </form>
          </div>

        </Main>

        <Footer className={'footer'}>
          Footer
        </Footer>
      </div >
    );
  }
}

export default App;
