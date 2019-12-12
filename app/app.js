/* lista użytkowników losowanych, np. do pełnienia dyżuru w niedzielę;
z możliwością dopisania użytkownika i losowania ponownego z udziałem tego dodanego */
const Header = () => {
    return (
        <header>
            <h1>Lista użytkowników</h1>
            <p className="subtitle">Popularność naszego oprogramowania rośnie</p>
            <div className="backgroundImage">
                
            </div>
            <p>Poniżej można zobaczyć listę użytkowników, a także dodać kolejnych i zobaczyć uaktualnioną listę (zawsze w kolejności alfabetycznej)</p>
        </header>
    )
}

const Footer = () => {
    return (
        <footer>
            <h3>Zainteresowanych prosimy o kontakt:</h3>
            <p>Business relations: <a href="mailto:akaw@onet.eu">Kontakt</a></p>
            <span>99-999 Głębokie</span><br/>
            <span>ul. Studzienna 99</span>
            <p>Wykonał: <a href="mailto:mpreus@onet.eu">Maciej Preus</a></p>
        </footer>
    )
}

class UsersList extends React.Component {
    state = {
        softwareUsers: ["Adam", "Barbara", "Czarek", "Darek", "Ewa", "Franek", "Grażyna", "Henryk", "Irek", "Janina", "Karol", "Lidia", "Marek", "Norbert", "Olga", "Paweł", "Roman", "Sabina", "Tadeusz", "Ula", "Waldek", "Zenon"],
        user: null,
        value: ""
    }
    
    handleShowList = () => {
        let listElements = document.getElementsByTagName("li");
        let hideButton = document.querySelector("button.hideButton")
        for (let i = 0; i < listElements.length; i++) {
            if (listElements[i].classList.contains("invisible")) {
                listElements[i].classList.remove("invisible")
                listElements[i].classList.add("visible")
                hideButton.classList.remove("invisible")
                hideButton.classList.add("visible")
            }
        }
    }
    handleHideList = () => {
        let listElements = document.getElementsByTagName("li");
        let hideButton = document.querySelector("button.hideButton")
        for (let i = 0; i < listElements.length; i++) {
            if (listElements[i].classList.contains("visible")) {
                listElements[i].classList.remove("visible")
                listElements[i].classList.add("invisible")
                hideButton.classList.remove("visible")
                hideButton.classList.add("invisible")
            }
        }
    }

    handleShowUser = () => {
        const index = Math.floor(Math.random() * this.state.softwareUsers.length);
        this.setState({
            user: this.state.softwareUsers[index]
        })
    }

    handleInputChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }
/* poniżej, jeśli input jest pusty, to klikanie na przycisk niczego nie dodaje */
    handleAddUser = () => {
        if (this.state.value === "") {
            return (
                alert("Niczego nie wpisałeś!")
            )
        }
/* takie dodanie jak poniżej można też przeprowadzić z metodą 'concat()':
const softwareUsers = this.state.softwareUsers.concat(this.state.value);
*/
        else {
            const softwareUsers = [...this.state.softwareUsers] /* kopia tablicy z bieżącymi wartościami */
            /* dodajemy do tablicy wartość z inputa i aktualizujemy 'state': */
            softwareUsers.push(this.state.value)
            this.setState({
                softwareUsers: softwareUsers, /* ponieważ klucz ze 'state' nazywa się 'softwareUsers' i nowa wartość tak samo, można tu dać tylko 'softwareUsers', bez 'softwareUsers: softwareUsers' */
                value: ""        /* czyścimy input, by móc wpisywać kolejne wartości */  
            })
            alert(`Użytkownik dodany. Aktualnie masz ${softwareUsers.length} użytkowników`)
        }
    }

    render() {
        return (
            <div className="userList">
                <button onClick={this.handleShowList}>Wszyscy użytkownicy</button>
                <ul>{this.state.softwareUsers.sort().map( u => <li className="invisible" key={u}>{u}</li>)}</ul>
                <button className="hideButton invisible" onClick={this.handleHideList}>Schowaj listę użytkowników</button>
                <br/>
                <h3>Poniżej można zobaczyć dowolnego losowego użytkownika</h3>
                <p>(tak losujemy zwycięzców naszej loterii)</p>
                <button onClick={this.handleShowUser}>Zobacz losowego użytkownika</button>
                {this.state.user ? <h4>{this.state.user}</h4> : null}
                <br/>
                <h3>Poniżej można dodać użytkownika</h3>
                <p>Wpisanie imienia i kliknięcie przycisku dodaje osobę do listy (sprawdź potem klikając przycisk 'Wszyscy użytkownicy')</p>
                <input type="text" value={this.state.value} onChange={this.handleInputChange} />
                <button onClick={this.handleAddUser}>Dodaj użytkownika</button>
            </div>
        )
    }
}

const App = () => {
    return (
        <React.Fragment>
            <Header />
            <UsersList />
            <Footer />
        </React.Fragment>
    )
}

ReactDOM.render(
    <App />, 
    document.getElementById('root')
)