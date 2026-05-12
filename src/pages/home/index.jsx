import React from 'react';
import ReactDOM from 'react-dom';
import { getScrollTop, getLink } from '../../../utils';
import Header from '../../components/header';
import Button from '../../components/button';
import Footer from '../../components/footer';
import Language from '../../components/language';
import Item from './featureItem';
import homeConfig from '../../../site_config/home';
import './index.scss';

class Home extends Language {
  constructor(props) {
    super(props);
    this.state = {
      headerType: 'primary',
      showTextUsers: false,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', () => {
      const scrollTop = getScrollTop();
      if (scrollTop > 66) {
        this.setState({
          headerType: 'normal',
        });
      } else {
        this.setState({
          headerType: 'primary',
        });
      }
    });
  }

  render() {
    const language = this.getLanguage();
    const dataSource = homeConfig[language];
    const { headerType, showTextUsers } = this.state;
    const headerLogo = headerType === 'primary' ? '/img/logo.png' : '/img/logo.png';
    const users = dataSource.users.list || [];
    const logoUsers = users.filter(user => typeof user === 'string' || user.img);
    const textUsers = users.filter(user => typeof user !== 'string' && !user.img);
    const visibleUsers = showTextUsers ? logoUsers.concat(textUsers) : logoUsers;
    const renderUserCard = (user, i) => {
      const img = typeof user === 'string' ? user : user.img;
      const name = typeof user === 'string' ? '' : user.name;
      const shortName = typeof user === 'string' ? '' : (user.shortName || user.name);
      const showName = typeof user !== 'string' && user.showName;
      const link = typeof user === 'string' ?
        user :
        (user.link || `https://www.baidu.com/s?wd=${encodeURIComponent(user.name)}`);
      return (
        <a
          className={`user-card${showName ? ' user-card-logo-name' : ''}${img ? '' : ' user-card-text'}`}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          title={name}
          key={name || i}
        >
          {
            img ?
              <React.Fragment>
                <img src={getLink(img)} alt={name} />
                {showName && <span className="user-card-name">{shortName}</span>}
              </React.Fragment> :
              <span>{shortName}</span>
          }
        </a>
      );
    };
    return (
      <div className="home-page">
        <section className="top-section">
          <Header
            currentKey="home"
            type={headerType}
            logo={headerLogo}
            language={language}
            onLanguageChange={this.onLanguageChange}
          />
          <div className="vertical-middle">
            <div className="hero-content">
              <div className="hero-copy">
                <div className="product-name">
                  <h2>{dataSource.brand.brandName}</h2>
                </div>
                <p className="product-desc">{dataSource.brand.briefIntroduction}</p>
                <div className="button-area">
                {
                  dataSource.brand.buttons.map(b => (
                    <Button type={b.type} key={b.text} link={b.link} target={b.target} icon={b.icon}>
                      {b.text}
                    </Button>
                  ))
                }
                </div>
                {
                  dataSource.brand.stats &&
                    <div className="hero-stats">
                    {
                      dataSource.brand.stats.map(stat => (
                        <div className="hero-stat" key={stat.label}>
                          <strong>{stat.value}</strong>
                          <span>{stat.label}</span>
                        </div>
                      ))
                    }
                    </div>
                }
              </div>
              <div className="hero-visual">
                <div className="preview-window">
                  <div className="preview-title">
                    <span />
                    <span />
                    <span />
                    <strong>preview.js</strong>
                  </div>
                  <pre>
                    {[
                      'const fileUrl = \'http://127.0.0.1:8080/file/test.docx\';',
                      'window.open(\'/onlinePreview?url=\' + encodeURIComponent(fileUrl));',
                    ].join('\n')}
                  </pre>
                  <div className="preview-formats">
                    <div className="formats-title">支持格式</div>
                    {
                      (dataSource.brand.supportedFormats || []).map(group => (
                        <div className="format-group" key={group.title}>
                          <strong>{group.title}</strong>
                          <span>{group.items}</span>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="feature-section">
          <h3>{dataSource.features.title}</h3>
          <ul>
          {
            dataSource.features.list.map((feature, i) => (
              <Item feature={feature} key={i} />
            ))
          }
          </ul>
        </section>
        <section className="users-section">
          <h3>{dataSource.users.title}</h3>
          <p>{dataSource.users.desc}</p>
          {
            dataSource.users.industries &&
              <div className="industry-tags">
              {
                dataSource.users.industries.map(industry => <span key={industry}>{industry}</span>)
              }
              </div>
          }
          <div className="users">
          {
            visibleUsers.map(renderUserCard)
          }
          {
            textUsers.length > 0 &&
              <button
                type="button"
                className={`user-card user-card-toggle${showTextUsers ? ' is-expanded' : ''}`}
                onClick={() => this.setState({ showTextUsers: !showTextUsers })}
              >
                <span className="user-card-toggle-title">
                  {showTextUsers ? '收起用户' : '展开更多用户'}
                </span>
                <span className="user-card-toggle-desc">
                  {showTextUsers ? '隐藏文字卡片' : `${textUsers.length} 位`}
                </span>
              </button>
          }
          {
            dataSource.users.more &&
              <a
                className="user-card user-card-more"
                href={dataSource.users.more.link}
                target="_blank"
                rel="noopener noreferrer"
                title={dataSource.users.more.text}
              >
                <span>{dataSource.users.more.text}</span>
              </a>
          }
          </div>
        </section>
        <section className="introduction-section">
          <div className="introduction-body">
            <div className="introduction">
              <h3>{dataSource.introduction.title}</h3>
              <p>{dataSource.introduction.desc}</p>
              {
                dataSource.introduction.supports &&
                  <ul className="support-list">
                  {
                    dataSource.introduction.supports.map(item => <li key={item}>{item}</li>)
                  }
                  </ul>
              }
              {
                dataSource.introduction.actions &&
                  <div className="community-actions">
                  {
                    dataSource.introduction.actions.map(action => (
                      <a
                        href={getLink(action.link)}
                        target={action.target || '_self'}
                        rel={action.target === '_blank' ? 'noopener noreferrer' : undefined}
                        key={action.text}
                      >
                        {action.text}
                      </a>
                    ))
                  }
                  </div>
              }
            </div>
            <img src={getLink(dataSource.introduction.img)} />
          </div>
        </section>
        <Footer logo="/img/logo.png" language={language} />
      </div>
    );
  }
}

document.getElementById('root') && ReactDOM.render(<Home />, document.getElementById('root'));

export default Home;
