import React, { createContext, Component } from 'react';
import './App.css';

/**
 * * * * * * * * * * *  
 * APPLICATION DATA
 * * * *
 * RACE DATA
 */
const seriesData = {
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

/**
 * APPLICATION DATA
 * * *
 * END
 * * * * * * * * * * *  
 * SHARED CONTEXT
 * * * *
 * START
 */

// COULD HAVE SEPARATE REDUCER FOR DATA.SERIES.DATA?
// const NavContext = React.createContext(null);
// const MainContext = React.createContext(null);

// const selectedContext = createContext({
//   isSelected: 'selected',
//   isNotSelected: 'not-selected'
// })

const isAuthenticated = {
  yes: true,
  no: false
};

const isShaking = {
  yes: true,
  no: false
}

const AuthContext = createContext({
  auth: isAuthenticated.no,
  shake: isShaking.no,
  toggleShake: (shake) => !shake,
  toggleAuth: (auth) => !auth
});

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

const Main = ({ children, shakeIt }) => {
  return (
    <div className={shakeIt ? 'shakeIt' : 'main'}>
      {children}
    </div>
  )
}

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
 * FORM COMPONENT START
 * * * *
 * START
 */

class AdminForm extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event, toggleAuth, auth) {
    event.preventDefault();
    if (!event.target.checkValidity()) {
      this.setState({
        invalid: true,
        displayErrors: true,
      });
      return;
    }

    const form = event.target;
    const data = new FormData(form);

    this.setState({
      res: stringifyFormData(data),
      invalid: false,
      displayErrors: false,
    });

    return toggleAuth(!auth)
  }


  render() {
    return (
      <AuthContext.Consumer>
        {({ auth, toggleAuth }) => (
          auth ? null : (
            <div className={this.props.shakeIt
              ? 'shake-it form-container'
              : 'form-container'}>
              <form
                onSubmit={event => this.handleSubmit(event, toggleAuth, auth)}
                className={'center-content login-form'}>
                <div>
                  <h2
                    className={'title center-content'}>
                    Admin Login
                  </h2>
                  <label htmlFor='email'>Email: </label>
                  <input
                    className={'custom-input'}
                    id='email'
                    name='email'
                    type='email' required />
                  <button
                    className={'submit-button'}>
                    Submit
              </button>
                </div>
              </form>
            </div>
          ))}
      </AuthContext.Consumer>

    )
  }

}

/**
 * FORM COMPONENT 
 * * *
 * END
 * * * * * * * * * * *  
 * NAVIGATION COMPONENT START
 * * * * 
 * START
 */

class NavigationAuth extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: ['Participants', 'Races'],
    }
  }

  render() {
    return (
      <Navigation className={'navigation'}>
        <h3 className={'title'}>
          Categories
        </h3>
        <NavigationCategories
          categories={this.state.categories} {...this.props}
          toggleRaceList={this.props.toggleRaceList}
          toggleUserList={this.props.toggleUserList}
        />
      </Navigation>
    )
  }
}

class NavigationCategories extends Component {
  handleCategoryClick(e) {
    return e.target.innerHTML === 'Races'
      ? this.props.toggleRaceList()
      : this.props.toggleUserList()
  }

  render() {
    return (
      <AuthContext.Consumer>
        {({ auth, shake, toggleShake }) => (
          <div>
            {this.props.categories.map((el, i) => (
              <div
                key={el + i}
                data-name={el}
                className={auth
                  ? 'list-item'
                  : 'disabled'}
                onClick={auth
                  ? (e) => this.handleCategoryClick(e)
                  : () => toggleShake(shake)}>
                {el}
              </div>
            ))}
          </div>)}
      </AuthContext.Consumer>
    )
  }
}
// below makes context provider's value prop available
// NavigationCategories.contextType = AuthContext;
/**
 * FORM COMPONENT 
 * * *
 * END
 * * * * * * * * * * *  
 * LIST COMPONENTS START
 * * * * 
 * START
 */
const ListItem = (props) => {
  return (
    <div
      className={`center-content list-item item-selected`} >
      {props.name}
    </div>
  )
}

class UserList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [
        ...seriesData.participants
      ],
      toggle: this.props.toggle
    }
  }
  render() {
    return (
      <div>
        <h2>Users List</h2>
        {this.state.users.map(item => (
          <ListItem
            key={item.id}
            name={item.name}
          />
        ))}
      </div>

    )
  }
}

class RaceList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      races: [
        ...seriesData.races
      ],
      toggle: this.props.toggle
    }
  }

  render() {
    return (
      <div>
        <h2>Race List</h2>
        {this.state.races.map(item => (
          <ListItem
            key={item.id}
            name={item.name}
          />
        ))}
      </div>
    )
  }

}

/**
 * LIST COMPONENTS
 * * *
 * END
 * * * * * * * * * * *
 * APP COMPONENT START
 * * * *
 * START
 */

class App extends Component {
  constructor(props) {
    super(props)
    this.toggleShake = shake =>
      this.setState({ shake: isShaking.yes }, state =>
        setTimeout(() =>
          this.setState(state =>
            ({ shake: isShaking.no })), 500));

    this.toggleAuth = auth =>
      this.setState(state => ({
        auth: auth
          ? isAuthenticated.yes
          : isAuthenticated.no,
      }));

    this.state = {
      auth: isAuthenticated.no,
      toggleAuth: this.toggleAuth,
      shake: isShaking.no,
      toggleShake: this.toggleShake,
      showRaceList: false,
      showUserList: false
    };
  }

  componentDidMount() {
    console.log(this.state);
  }

  handleUserList() {
    return this.setState({
      showRaceList: false,
      showUserList: true
    })
  }

  handleRaceList() {
    return this.setState({
      showRaceList: true,
      showUserList: false
    })
  }

  render() {
    return (
      <div className='App'>
        <Header className={'header'}>
          <h1>
            [undefined] Race Series
          </h1>
        </Header>

        <AuthContext.Provider value={this.state}>
          <NavigationAuth
            toggleUserList={() => this.handleUserList()}
            toggleRaceList={() => this.handleRaceList()}
          />

          <Main>
            <AdminForm shakeIt={this.state.shake} />
            {
              this.state.showUserList
                ? <UserList className={'user-list'} />
                : null
            }
            {
              this.state.showRaceList
                ? <RaceList />
                : null
            }
          </Main>
        </AuthContext.Provider>

        <Footer className={'footer center-content'}>
          made with love {'\u2764'}
        </Footer>
      </div >
    );
  }
}

function stringifyFormData(fd) {
  const data = {};
  for (let key of fd.keys()) {
    data[key] = fd.get(key);
  }
  // if you need to stringify to send to API
  // return JSON.stringify(data, null, 2);
  return data
}

export default App;
