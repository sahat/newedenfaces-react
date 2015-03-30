var React = require('react');
var Router = require('react-router');

var Link = Router.Link;

var Navbar = React.createClass({

  getInitialState: function() {
    return {
      ajaxAnimation: ''
    }
  },

  componentDidMount: function() {
    $(document).ajaxStart(function() {
      this.setState({ ajaxAnimation: 'fadeIn' });
    }.bind(this));

    $(document).ajaxComplete(function() {
      setTimeout(function() {
        this.setState({ ajaxAnimation: 'fadeOut' });
      }.bind(this), 750);
    }.bind(this));
  },

  render: function() {
    return (
      <nav className='navbar navbar-default navbar-static-top'>
        <div className='navbar-header'>
          <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#navbar'>
            <span className='sr-only'>Toggle navigation</span>
            <span className='icon-bar'></span>
            <span className='icon-bar'></span>
            <span className='icon-bar'></span>
          </button>
          <a className='navbar-brand' href='#'>
            <span ref='triangles' className={'triangles animated ' + this.state.ajaxAnimation}>
              <div className='tri invert'></div>
              <div className='tri invert'></div>
              <div className='tri'></div>
              <div className='tri invert'></div>
              <div className='tri invert'></div>
              <div className='tri'></div>
              <div className='tri invert'></div>
              <div className='tri'></div>
              <div className='tri invert'></div>
            </span>
            NEF
          </a>
        </div>
        <div id='navbar' className='navbar-collapse collapse'>
          <form className='navbar-form navbar-left'>
            <div className='input-group'>
              <input type='text' className='form-control' placeholder='Search'/>
              <span className='input-group-btn'>
                <button className='btn btn-default' type='button'>Go!</button>
              </span>
            </div>
          </form>
          <ul className='nav navbar-nav'>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/stats'>Stats</Link></li>
            <li className='dropdown'>
              <a href='#' className='dropdown-toggle' data-toggle='dropdown'>Top 100 <span className='caret'></span></a>
              <ul className='dropdown-menu'>
                <li><Link to='/top'>Top Overall</Link></li>
                <li className='dropdown-submenu'>
                  <Link to='/top/caldari'>Caldari</Link>
                  <ul className='dropdown-menu'>
                    <li><Link to='/top/caldari/achura'>Achura</Link></li>
                    <li><Link to='/top/caldari/civire'>Civire</Link></li>
                    <li><Link to='/top/caldari/deteis'>Deteis</Link></li>
                  </ul>
                </li>
                <li className='dropdown-submenu'>
                  <Link to='/top/gallente'>Gallente</Link>
                  <ul className='dropdown-menu'>
                    <li><Link to='/top/gallente/gallente'>Gallente</Link></li>
                    <li><Link to='/top/gallente/intaki'>Intaki</Link></li>
                    <li><Link to='/top/gallente/jin-mei'>Jin-Mei</Link></li>
                  </ul>
                </li>
                <li className='dropdown-submenu'>
                  <Link to='/top/minmatar'>Minmatar</Link>
                  <ul className='dropdown-menu'>
                    <li><Link to='/top/minmatar/brutor'>Brutor</Link></li>
                    <li><Link to='/top/minmatar/sebiestor'>Sebiestor</Link></li>
                    <li><Link to='/top/minmatar/vherokior'>Vherokior</Link></li>
                  </ul>
                </li>
                <li className='dropdown-submenu'>
                  <Link to='/top/amarr'>Amarr</Link>
                  <ul className='dropdown-menu'>
                    <li><Link to='/top/amarr/amarr'>Amarr</Link></li>
                    <li><Link to='/top/amarr/ni-kunni'>Ni-Kunni</Link></li>
                    <li><Link to='/top/amarr/khanid'>Khanid</Link></li>
                  </ul>
                </li>
                <li className='divider'></li>
                <li><Link to='/shame'>Hall of Shame</Link></li>
              </ul>
            </li>
            <li className='dropdown'>
              <a href='#' className='dropdown-toggle' data-toggle='dropdown'>Female <span className='caret'></span></a>
              <ul className='dropdown-menu'>
                <li><Link to='/female'>All</Link></li>
                <li className='dropdown-submenu'>
                  <Link to='/female/caldari'>Caldari</Link>
                  <ul className='dropdown-menu'>
                    <li><Link to='/female/caldari/achura'>Achura</Link></li>
                    <li><Link to='/female/caldari/civire/'>Civire</Link></li>
                    <li><Link to='/female/caldari/deteis'>Deteis</Link></li>
                  </ul>
                </li>
                <li className='dropdown-submenu'>
                  <Link to='/female/gallente'>Gallente</Link>
                  <ul className='dropdown-menu'>
                    <li><Link to='/female/gallente/gallente'>Gallente</Link></li>
                    <li><Link to='/female/gallente/intaki'>Intaki</Link></li>
                    <li><Link to='/female/gallente/jin-mei'>Jin-Mei</Link></li>
                  </ul>
                </li>
                <li className='dropdown-submenu'>
                  <Link to='/female/minmatar'>Minmatar</Link>
                  <ul className='dropdown-menu'>
                    <li><Link to='/female/minmatar/brutor'>Brutor</Link></li>
                    <li><Link to='/female/minmatar/sebiestor'>Sebiestor</Link></li>
                    <li><Link to='/female/minmatar/vherokior'>Vherokior</Link></li>
                  </ul>
                </li>
                <li className='dropdown-submenu'>
                  <Link to='/female/amarr'>Amarr</Link>
                  <ul className='dropdown-menu'>
                    <li><Link to='/female/amarr/amarr'>Amarr</Link></li>
                    <li><Link to='/female/amarr/ni-kunni'>Ni-Kunni</Link></li>
                    <li><Link to='/female/amarr/khanid'>Khanid</Link></li>
                  </ul>
                </li>
              </ul>
            </li>
            <li className='dropdown'>
              <a href='#' className='dropdown-toggle' data-toggle='dropdown'>Male <span className='caret'></span></a>
              <ul className='dropdown-menu'>
                <li><Link to='/male'>All</Link></li>
                <li className='dropdown-submenu'>
                  <Link to='/male/caldari'>Caldari</Link>
                  <ul className='dropdown-menu'>
                    <li><Link to='/male/caldari/achura'>Achura</Link></li>
                    <li><Link to='/male/caldari/civire'>Civire</Link></li>
                    <li><Link to='/male/caldari/deteis'>Deteis</Link></li>
                  </ul>
                </li>
                <li className='dropdown-submenu'>
                  <Link to='/male/gallente'>Gallente</Link>
                  <ul className='dropdown-menu'>
                    <li><Link to='/male/gallente/gallente'>Gallente</Link></li>
                    <li><Link to='/male/gallente/intaki'>Intaki</Link></li>
                    <li><Link to='/male/gallente/jin-mei'>Jin-Mei</Link></li>
                  </ul>
                </li>
                <li className='dropdown-submenu'>
                  <Link to='/male/minmatar'>Minmatar</Link>
                  <ul className='dropdown-menu'>
                    <li><Link to='/male/minmatar/brutor'>Brutor</Link></li>
                    <li><Link to='/male/minmatar/sebiestor'>Sebiestor</Link></li>
                    <li><Link to='/male/minmatar/vherokior'>Vherokior</Link></li>
                  </ul>
                </li>
                <li className='dropdown-submenu'>
                  <Link to='/male/amarr'>Amarr</Link>
                  <ul className='dropdown-menu'>
                    <li><Link to='/male/amarr/amarr'>Amarr</Link></li>
                    <li><Link to='/male/amarr/ni-kunni'>Ni-Kunni</Link></li>
                    <li><Link to='/male/amarr/khanid'>Khanid</Link></li>
                  </ul>
                </li>
              </ul>
            </li>
            <li><Link to='/add'>Add</Link></li>
          </ul>
        </div>
      </nav>
    );
  }
});

module.exports = Navbar;