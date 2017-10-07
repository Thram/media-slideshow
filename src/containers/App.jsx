/**
 * Created by thram on 21/01/17.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import { selectDirectory } from '../api/electron';
import Viewer from '../components/Viewer';
import Navigation from '../components/Navigation';
import LoadButton from '../components/LoadButton';
import { interactionsMonitor } from '../utils';

const MainContainer = styled.div({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  display: 'flex',
  backgroundColor: '#272727',
});

class App extends Component {
  state = { current: 0, activeUI: true, showSlideshow: false };

  componentDidMount() {
    interactionsMonitor({
      onStart: () => this.setState({ activeUI: true }),
      onIdle: () => this.setState({ activeUI: false }),
    });
  }
  onRest = () => {
    this.setState({ showSlideshow: !!this.state.files });
  };
  onSelect = (index) => {
    this.setState({ current: index });
  };

  loadContent = async () => {
    const files = await selectDirectory();
    this.setState({ files });
  };

  render = () => (
    <MainContainer>
      <LoadButton
        onClick={this.loadContent}
        shrink={!!this.state.files}
        show={!this.state.files || this.state.activeUI}
        onRest={this.onRest}
      />
      {this.state.files && <Viewer file={this.state.files[this.state.current]} />}
      {this.state.files &&
        this.state.showSlideshow && (
          <Navigation
            files={this.state.files}
            current={this.state.current}
            show={this.state.activeUI}
            onSelect={this.onSelect}
          />
        )}
    </MainContainer>
  );
}

export default connect(({ app }) => ({ ...app }))(App);
