import React, { PureComponent } from 'react';

export default ({ fetcher = () => {}, loading = true }) => (WrappedComponent) => (

  class extends PureComponent {

    state = {
      loading,
      error: null,
      data: null
    }

    componentDidMount() {
      if (loading) {
        this.fetchData();
      }
    }

    fetchData = (...params) => {
      if (!this.state.loading) {
        this.setState({
          loading: true
        }, async () => {
          try {
            const data = await fetcher.apply(this, params);
            this.setState({
              data,
              error: null,
              loading: false
            });
          } catch (e) {
            this.setState({
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
          fetchData={this.fetchData}
          {...this.state}
          {...this.props} />
      );
    }

  }
);
