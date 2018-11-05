import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Col, Container, Row, Button, Badge } from "reactstrap";
import NavBar from "../navs/NavBar";
import { fetchDocs } from "../../actions/docs";
import { allDocsSelector } from "../../reducers/docs";

class StatsPage extends React.Component {
	state = {
		docs: [],
		uniTags: [],
		ndocs: [],
		update: false
	};

	componentDidMount = () => {
		this.onInit(this.props);
	};

	onInit = props => {
		props.fetchDocs().then(() => this.setState({ docs: this.props.docs }));
		axios
			.post("/api/docs/unique_tags")
			.then(res => res.data.tags)
			.then(uniTags => this.setState({ uniTags }));
		this.setState({ update: true });
		return true;
	};

	componentDidUpdate(prevProps, prevState) {
		if (prevState.uniTags !== this.state.uniTags) {
			//console.log(this.state.docs);
			//console.log(this.state.uniTags);

			const { docs, uniTags } = this.state;
			let ndocs = [];
			uniTags.map(tag => {
				ndocs[tag] = 0;
				docs.map(doc => {
					if (doc.tags.includes(tag)) {
						ndocs[tag]++;
					}
					return null;
				});
				return null;
			});
			this.setState({ ndocs });
		}
	}

	render() {
		const { uniTags, ndocs } = this.state;

		return (
			<div className="Container">
				<NavBar />
				<h4 style={{ textAlign: "center", marginTop: "50px" }}>
					Stats
				</h4>
				<Container style={{ marginTop: "50px" }}>
					<Row style={{ marginTop: "20px" }}>
						<Col sm="12" md={{ size: 8, offset: 2 }}>
							<strong>
								Total Documents:&nbsp;&nbsp;&nbsp;&nbsp;
							</strong>{" "}
							{this.props.docs.length}
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<strong>Tags:&nbsp;&nbsp;&nbsp;&nbsp;</strong>{" "}
							{this.state.uniTags.length}
							<br />
							<br />
							{uniTags.map(t => (
								<Button
									color="info"
									key={t}
									style={{ marginRight: "5px" }}
								>
									{t}{" "}
									<Badge color="warning">{ndocs[t]}</Badge>
								</Button>
							))}
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		docs: allDocsSelector(state)
	};
}

export default connect(
	mapStateToProps,
	{ fetchDocs }
)(StatsPage);
