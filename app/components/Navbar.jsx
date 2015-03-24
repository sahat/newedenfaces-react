var React = require('react');
var Router = require('react-router');

var Link = Router.Link;

var Navbar = React.createClass({
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
          <a className='navbar-brand' href='#'>NEF</a>
        </div>
        <div id='navbar' className='navbar-collapse collapse'>
          <form className='navbar-form navbar-left' role='search'>
            <div className='input-group'>
              <input type='text' className='form-control' placeholder='Search'/>
              <span className='input-group-btn'>
                <button className='btn btn-default' type='button'>Go!</button>
              </span>
            </div>
          </form>
          <ul className='nav navbar-nav'>
            <li><Link to='/home'>Home</Link></li>
            <li><Link to='/stats'>Stats</Link></li>
            <li className='dropdown'>
              <a href='#' className='dropdown-toggle' data-toggle='dropdown' role='button'>Top 100
                <span className='caret'></span></a>
              <ul className='dropdown-menu' role='menu'>
                <li><Link to='/top'>Top Overall</Link></li>
                <li className='dropdown-submenu'>
                  <Link to='/top/caldari'>Caldari</Link>
                  <ul className='dropdown-menu' role='menu'>
                    <li><Link to='/top/caldari/achura'>Achura</Link></li>
                    <li><Link to='/top/caldari/civire'>Civire</Link></li>
                    <li><Link to='/top/caldari/deteis'>Deteis</Link></li>
                  </ul>
                </li>
                <li className='dropdown-submenu'>
                  <a href='#'>Gallente</a>
                  <ul className='dropdown-menu' role='menu'>
                    <li><a href='#'>Gallente</a></li>
                    <li><a href='#'>Intaki</a></li>
                    <li><a href='#'>Jin-Mei</a></li>
                  </ul>
                </li>
                <li className='dropdown-submenu'>
                  <a href='#'>Minmatar</a>
                  <ul className='dropdown-menu' role='menu'>
                    <li><a href='#'>Brutor</a></li>
                    <li><a href='#'>Sebiestor</a></li>
                    <li><a href='#'>Vherokior</a></li>
                  </ul>
                </li>
                <li className='dropdown-submenu'>
                  <a href='#'>Amarr</a>
                  <ul className='dropdown-menu' role='menu'>
                    <li><a href='#'>Amarr</a></li>
                    <li><a href='#'>Ni-Kunni</a></li>
                    <li><a href='#'>Khanid</a></li>
                  </ul>
                </li>
                <li className='divider'></li>
                <li><a href='#'>Hall of Shame</a></li>
              </ul>
            </li>
            <li className='dropdown'>
              <a href='#' className='dropdown-toggle' data-toggle='dropdown' role='button'>Female
                <span className='caret'></span></a>
              <ul className='dropdown-menu' role='menu'>
                <li><a href='#'>All</a></li>
                <li className='dropdown-submenu'>
                  <a href='#'>Caldari</a>
                  <ul className='dropdown-menu' role='menu'>
                    <li><a href='#'>Achura</a></li>
                    <li><a href='#'>Civire</a></li>
                    <li><a href='#'>Deteis</a></li>
                  </ul>
                </li>
                <li className='dropdown-submenu'>
                  <a href='#'>Gallente</a>
                  <ul className='dropdown-menu' role='menu'>
                    <li><a href='#'>Gallente</a></li>
                    <li><a href='#'>Intaki</a></li>
                    <li><a href='#'>Jin-Mei</a></li>
                  </ul>
                </li>
                <li className='dropdown-submenu'>
                  <a href='#'>Minmatar</a>
                  <ul className='dropdown-menu' role='menu'>
                    <li><a href='#'>Brutor</a></li>
                    <li><a href='#'>Sebiestor</a></li>
                    <li><a href='#'>Vherokior</a></li>
                  </ul>
                </li>
                <li className='dropdown-submenu'>
                  <a href='#'>Amarr</a>
                  <ul className='dropdown-menu' role='menu'>
                    <li><a href='#'>Amarr</a></li>
                    <li><a href='#'>Ni-Kunni</a></li>
                    <li><a href='#'>Khanid</a></li>
                  </ul>
                </li>
              </ul>
            </li>
            <li className='dropdown'>
              <a href='#' className='dropdown-toggle' data-toggle='dropdown' role='button'>Male
                <span className='caret'></span></a>
              <ul className='dropdown-menu' role='menu'>
                <li><a href='#'>All</a></li>
                <li className='dropdown-submenu'>
                  <a href='#'>Caldari</a>
                  <ul className='dropdown-menu' role='menu'>
                    <li><a href='#'>Achura</a></li>
                    <li><a href='#'>Civire</a></li>
                    <li><a href='#'>Deteis</a></li>
                  </ul>
                </li>
                <li className='dropdown-submenu'>
                  <a href='#'>Gallente</a>
                  <ul className='dropdown-menu' role='menu'>
                    <li><a href='#'>Gallente</a></li>
                    <li><a href='#'>Intaki</a></li>
                    <li><a href='#'>Jin-Mei</a></li>
                  </ul>
                </li>
                <li className='dropdown-submenu'>
                  <a href='#'>Minmatar</a>
                  <ul className='dropdown-menu' role='menu'>
                    <li><a href='#'>Brutor</a></li>
                    <li><a href='#'>Sebiestor</a></li>
                    <li><a href='#'>Vherokior</a></li>
                  </ul>
                </li>
                <li className='dropdown-submenu'>
                  <a href='#'>Amarr</a>
                  <ul className='dropdown-menu' role='menu'>
                    <li><a href='#'>Amarr</a></li>
                    <li><a href='#'>Ni-Kunni</a></li>
                    <li><a href='#'>Khanid</a></li>
                  </ul>
                </li>
              </ul>
            </li>
            <li><a href='#'>Add</a></li>
          </ul>
        </div>
      </nav>
    );
  }
});

module.exports = Navbar;