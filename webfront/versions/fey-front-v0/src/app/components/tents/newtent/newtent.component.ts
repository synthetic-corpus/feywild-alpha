import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TentHttpService } from 'src/app/services/http/tent-http.service';
import { NewTent} from 'src/app/services/http/interfaces/tent.interfaces'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SanitizeStringsService } from 'src/app/services/sanitize-strings.service';

@Component({
  selector: 'app-newtent',
  templateUrl: './newtent.component.html',
  styleUrls: ['./newtent.component.css']
})
export class NewTentComponent implements OnInit {

  @Output() newPlayer = new EventEmitter<NewTent>()

  constructor(
    private tentHttpservice: TentHttpService,
    private sanitize: SanitizeStringsService
  ) { }

  newPlayerCharacter: FormGroup
  ngOnInit(): void {
    this.newPlayerCharacter = new FormGroup({
      playernameFC: new FormControl(null,[
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        this.sanitize.mustHaveLetters()
      ]),
      characterNameFC: new FormControl(null,[
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        this.sanitize.mustHaveLetters()
      ]),
      initiativeFC: new FormControl(0,[
        Validators.required,
        Validators.max(10),
        Validators.min(-10),
        this.sanitize.mustBeInterger()
      ]),
      passive_perceptionFC: new FormControl(0,[
        Validators.required,
        Validators.max(10),
        Validators.min(-10),
        this.sanitize.mustBeInterger()
      ]),
      spell_dc: new FormControl(null,[
        Validators.max(10),
        Validators.min(-10),
        this.sanitize.mustBeInterger()
      ]),
      acFC: new FormControl(0,[
        Validators.required,
        Validators.max(10),
        Validators.min(-10),
        this.sanitize.mustBeInterger()
      ]),
      notesFC: new FormControl(null,[
        Validators.minLength(3),
        Validators.maxLength(300),
        this.sanitize.mustHaveLetters()
      ])
    })
  }

  onSave(){
    // Constructs an object ready for database, then outputs the object it got back from the database
    const playerName = this.sanitize.sanitize(this.newPlayerCharacter.value.playernameFC)
    const characterName = this.sanitize.sanitize(this.newPlayerCharacter.value.characterNameFC)

    const newCharacterObject: NewTent = {
      player: playerName,
      character: characterName,
      initiative: this.newPlayerCharacter.value.initiativeFC,
      ac: this.newPlayerCharacter.value.acFC,
      passive_perception: this.newPlayerCharacter.value.passive_perceptionFC
    }

    if (this.newPlayerCharacter.value.notesFC){
      const notes = this.sanitize.sanitize(this.newPlayerCharacter.value.notesFC)
      newCharacterObject.notes = notes
    }

    if (this.newPlayerCharacter.value.spell_dc){
      newCharacterObject.spell_dc = this.newPlayerCharacter.value.spell_dc
    }
    this.tentHttpservice.createTent(newCharacterObject)
      .subscribe(
        (reply) => {
          console.log(reply)
          this.newPlayer.emit(newCharacterObject) // When received, triggers a reload.
        }
      )
  }

}
