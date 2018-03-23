import React, { PureComponent } from 'react';

const DO_NOTHING = () => {};

export default ({ init = DO_NOTHING, action = DO_NOTHING, loading = false }) => (WrappedComponent) => (

  class extends PureComponent {

    state = {
      loading,
      error: null,
      data: null
    }

    componentDidMount() {
      this.mount = true;
      this.fetchData(init)(this.props, this.state);
    }

    componentWillUnmount() {
      this.mount = false;
    }

    safeSetState = (newState) => {
      if (this.mount) {
        this.setState(newState);
      }
    }

    fetchData = (fetcher) => (...params) => {
      if (!this.state.loading) {
        this.setState({
          loading: true
        }, async () => {
          try {
            const data = await fetcher.apply(this, params);
            this.safeSetState({
              data,
              error: null,
              loading: false
            });
          } catch (e) {
            this.safeSetState({
              data: null,
              error: e,
              loading: false
            });
          }
        });
      }
    }

    render() {
      return (
        <WrappedComponent
          action={this.fetchData(action(this.props, this.state))}
          {...this.state}
          {...this.props} />
      );
    }

  }
);
